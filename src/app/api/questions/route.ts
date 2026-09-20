import { NextRequest, NextResponse } from "next/server";
import {
  generateXATDMQuestions,
  generateXATGKQuestions,
  searchExamAwareQuestions,
  routeExamQuestions,
} from "@/lib/xat";
import { getDynamicPracticeQuestions } from "@/lib/question-engine";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const exam = searchParams.get("exam") || "";
  const section = searchParams.get("section") || "";
  const topic = searchParams.get("topic") || "";
  const difficulty = searchParams.get("difficulty") || "ALL";
  const type = (searchParams.get("type") || "ALL") as "ALL" | "STATIC" | "CURRENT_AFFAIRS";
  const timeFilter = searchParams.get("timeFilter") || "ALL";
  const category = searchParams.get("category") || "ALL";
  const search = searchParams.get("search") || "";
  const count = parseInt(searchParams.get("count") || "10", 10);

  const normExam = exam.trim().toUpperCase();
  const normSection = section.trim().toLowerCase();
  const isDM = normSection.includes("decision") || normSection.includes("dm") || topic.toLowerCase().includes("dm");
  const isGK = normSection.includes("knowledge") || normSection.includes("gk") || normSection.includes("current") || topic.toLowerCase().includes("gk");

  // =========================================================================
  // STRICT BACKEND SECURITY ENFORCEMENT (Requirement 25)
  // Decision Making (DM) and General Knowledge (GK) are strictly exclusive to XAT.
  // =========================================================================
  if ((isDM || isGK) && normExam !== "XAT") {
    return NextResponse.json(
      {
        success: false,
        error: `ACCESS DENIED: Section '${section || topic}' is strictly exclusive to XAT. Access under exam context '${exam || "UNKNOWN"}' is prohibited.`,
        examContext: exam,
        questions: [],
      },
      { status: 403 }
    );
  }

  // Handle Search Query
  if (search) {
    // If inside CAT, NMAT, SNAP, CET, searchExamAwareQuestions automatically returns 0 DM/GK
    const searchResults = searchExamAwareQuestions({
      examContext: normExam,
      query: search,
    });
    return NextResponse.json({
      success: true,
      examContext: normExam,
      query: search,
      resultsCount: searchResults.length,
      results: searchResults,
    });
  }

  // Handle XAT Specific Requests
  if (normExam === "XAT") {
    if (isDM) {
      const caselets = generateXATDMQuestions({
        exam: "XAT",
        difficulty: difficulty !== "ALL" ? difficulty : undefined,
        category: category !== "ALL" ? category : undefined,
        count,
      });
      return NextResponse.json({
        success: true,
        exam: "XAT",
        section: "Decision Making",
        totalCaselets: caselets.length,
        data: caselets,
      });
    }

    if (isGK) {
      const questions = generateXATGKQuestions({
        exam: "XAT",
        type,
        difficulty: difficulty !== "ALL" ? difficulty : undefined,
        timeFilterWindow: timeFilter !== "ALL" ? timeFilter : undefined,
        category: category !== "ALL" ? category : undefined,
        count,
      });
      return NextResponse.json({
        success: true,
        exam: "XAT",
        section: "General Knowledge",
        totalQuestions: questions.length,
        data: questions,
      });
    }
  }

  // Generic Practice Engine fallback (with strict exam context passed through)
  const genericQuestions = getDynamicPracticeQuestions({
    topic,
    difficulty: difficulty as any,
    count,
    exam: normExam.toLowerCase(),
  });

  return NextResponse.json({
    success: true,
    examContext: normExam,
    totalQuestions: genericQuestions.length,
    data: genericQuestions,
  });
}
