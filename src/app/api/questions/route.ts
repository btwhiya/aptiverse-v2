import { NextRequest, NextResponse } from "next/server";
import {
  generateXATDMQuestions,
  generateXATGKQuestions,
  searchExamAwareQuestions,
  routeExamQuestions,
} from "@/lib/xat";
import {
  getMAHCETARQuestions,
  searchMAHCETAR,
} from "@/lib/mah-cet";
import {
  getSNAPQuestions,
  searchSNAPAware,
  isSNAPExclusiveTopic,
} from "@/lib/snap";
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

  const normExam = exam.trim().toUpperCase().replace(/[-_]/g, " ");
  const normSection = section.trim().toLowerCase();
  const isDM = normSection.includes("decision") || normSection.includes("dm") || topic.toLowerCase().includes("dm");
  const isGK = normSection.includes("knowledge") || normSection.includes("gk") || normSection.includes("current") || topic.toLowerCase().includes("gk");
  const isAR = normSection.includes("abstract") || normSection.includes("ar") || topic.toLowerCase().includes("abstract");
  const isEthics = isSNAPExclusiveTopic(section) || isSNAPExclusiveTopic(topic);

  // =========================================================================
  // STRICT BACKEND SECURITY ENFORCEMENT
  // 1. Decision Making (DM) & General Knowledge (GK) are strictly exclusive to XAT.
  // 2. Abstract Reasoning (AR) is strictly exclusive to MAH CET.
  // 3. Ethics, Morality & Values are strictly exclusive to SNAP.
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

  if (isAR && normExam !== "MAH CET" && normExam !== "MAHCET") {
    return NextResponse.json(
      {
        success: false,
        error: `ACCESS DENIED: Section 'Abstract Reasoning' is strictly exclusive to MAH CET. Access under exam context '${exam || "UNKNOWN"}' is prohibited.`,
        examContext: exam,
        questions: [],
      },
      { status: 403 }
    );
  }

  if (isEthics && normExam !== "SNAP") {
    return NextResponse.json(
      {
        success: false,
        error: `ACCESS DENIED: Section 'Ethics, Morality & Values' is strictly exclusive to SNAP. Access under exam context '${exam || "UNKNOWN"}' is prohibited.`,
        examContext: exam,
        questions: [],
      },
      { status: 403 }
    );
  }

  // Handle Search Query
  if (search) {
    // If inside CAT, NMAT, SNAP, searchExamAwareQuestions automatically returns 0 DM/GK
    const xatResults = searchExamAwareQuestions({
      examContext: normExam,
      query: search,
    });
    // MAH CET AR search returns results ONLY when exam is MAH CET
    const mahCetResults = searchMAHCETAR(normExam, search);
    // SNAP search returns results ONLY when exam is SNAP
    const snapSearchResults = searchSNAPAware(normExam, search);

    return NextResponse.json({
      success: true,
      examContext: normExam,
      query: search,
      resultsCount: xatResults.length + mahCetResults.length + snapSearchResults.questions.length,
      results: [
        ...xatResults,
        ...mahCetResults,
        ...snapSearchResults.questions.map(q => ({
          id: q.id,
          title: q.question.slice(0, 70) + "...",
          section: q.section,
          topic: q.topic,
          difficulty: q.difficulty,
          type: "SNAP Question",
          link: `/exams/snap`,
        }))
      ],
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

  // Handle MAH CET Specific Requests
  if (normExam === "MAH CET" || normExam === "MAHCET") {
    if (isAR) {
      const arQuestions = getMAHCETARQuestions({
        exam: "MAH CET",
        category: category !== "ALL" ? (category as any) : undefined,
        difficulty: difficulty !== "ALL" ? (difficulty as any) : undefined,
        limit: count,
      });
      return NextResponse.json({
        success: true,
        exam: "MAH CET",
        section: "Abstract Reasoning",
        totalQuestions: arQuestions.length,
        data: arQuestions,
      });
    }
  }

  // Handle SNAP Specific Requests
  if (normExam === "SNAP") {
    const snapQuestions = getSNAPQuestions({
      exam: "SNAP",
      topic: topic || (section && section !== "ALL" ? section : undefined),
      difficulty: difficulty !== "ALL" ? difficulty : undefined,
      limit: count,
    });
    return NextResponse.json({
      success: true,
      exam: "SNAP",
      section: section || "SNAP Preparation",
      totalQuestions: snapQuestions.length,
      data: snapQuestions,
    });
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
