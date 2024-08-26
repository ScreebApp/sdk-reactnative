export type HooksEvent =
  | "onSurveyShowed"
  | "onSurveyStarted"
  | "onQuestionReplied"
  | "onSurveyCompleted"
  | "onSurveyHidden"
  | "onReady"
  | "onSurveyDisplayAllowed"
  | "onMessageDisplayAllowed";

type Platform = "android" | "ios";

type Position =
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type SurveySize = 25 | 50 | 75 | 100 | 125 | 150;

type Survey = {
  id: string;
  survey_position: Position;
  survey_size: SurveySize;
  survey_format: "conversational" | "cards";
};

type Question = {
  id: string;
  title: string;
  type: "text" | "video";
  url: string;
};

type Answer = {
  fields: {
    type: "string" | "number" | "boolean" | "none" | "time" | "url";
  };
  text: string;
  number: number;
  boolean: boolean;
  time: Date;
  url: string;
};

export type HooksPayload = {
  onSurveyShowed: {
    channel: {
      id: string;
      type: Platform;
    };
    survey: Survey;
    response: {
      id: string;
      items: {
        question: Question;
        answer: Answer[] | undefined;
        replied_at: Date | undefined;
      }[];
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onSurveyStarted: {
    channel: {
      id: string;
      type: Platform;
    };
    survey: Survey;
    response: {
      id: string;
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onQuestionReplied: {
    channel: {
      id: string;
      type: Platform;
    };
    survey: Survey;
    response: {
      id: string;
      status: "started" | "ended" | "closed" | "interrupted";
      question: Question;
      answer: Answer;
      items: {
        question: Question;
        answer: Answer[] | undefined;
        replied_at: Date | undefined;
      }[];
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onSurveyCompleted: {
    channel: {
      id: string;
      type: Platform;
    };
    survey: Survey;
    response: {
      id: string;
      items: {
        question: Question;
        answer: Answer[] | undefined;
        replied_at: Date | undefined;
      }[];
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onSurveyHidden: {
    channel: {
      id: string;
      type: Platform;
    };
    survey: Survey;
    response: {
      id: string;
      hide_reason: "started" | "ended" | "closed" | "interrupted";
      items: {
        question: Question;
        answer: Answer[] | undefined;
        replied_at: Date | undefined;
      }[];
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onReady: {
    channel: {
      id: string;
      type: Platform;
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onSurveyDisplayAllowed: {
    channel: {
      id: string;
      type: "widget";
    };
    survey: {
      id: string;
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };

  onMessageDisplayAllowed: {
    channel: {
      id: string;
      type: "widget";
    };
    message: {
      id: string;
    };
    user: {
      anonymous_id: string;
      user_id: string;
    };
  };
};

export type Hooks = {
  [key in HooksEvent]?: (payload: HooksPayload[key]) => void;
} & {
  version?: string;
};
