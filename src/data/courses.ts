export type ActionStep = {
    id: string;
    action: string;
    detail: string;
    duration: string;
    type: "review" | "practice" | "strategy" | "admin";
};

export type Scenario = {
    id: string;
    emoji: string;
    label: string;
    description: string;
    color: string;
    steps: ActionStep[];
};

export type SituationGuide = {
    advice: string;
    chatbotContext: string;
    priorityAction: string;
};

export type Course = {
    id: string;
    title: string;
    subject: string;
    description: string;
    teachers: {
        name: string;
        style: string;
        strengths: string[];
    }[];
    successTips: {
        strategy: string;
        timeManagement: string;
        mistakes: string[];
        pastStudentWisdom: string[];
    };
    resources: {
        practice: { title: string; url: string }[];
        textbooks: { title: string; url: string }[];
        schedules: { title: string; url: string }[];
        videos: { title: string; url: string }[];
    };
    classAdvice: {
        noteTaking: string;
        focus: string;
        preparation: string;
    };
    studentQuotes: {
        category: "Study Tips" | "Test Prep" | "Mental Health" | "General";
        text: string;
        author: string;
    }[];
    scenarios: Scenario[];
    situationGuides: {
        [key: string]: SituationGuide;
    };
};

export const courses: Course[] = [
    {
        id: "ap-calculus-ab",
        title: "AP Calculus AB",
        subject: "Math",
        description: "An introduction to differential and integral calculus. Covers limits, derivatives, integrals, and the Fundamental Theorem of Calculus.",
        teachers: [
            {
                name: "Mr. Smith",
                style: "Lecture-heavy with lots of examples",
                strengths: ["Clear explanations", "Available for extra help", "Structured notes"],
            },
            {
                name: "Ms. Johnson",
                style: "Discussion-based and problem-solving focused",
                strengths: ["Great at conceptual understanding", "Encourages group work", "Patient"],
            },
        ],
        successTips: {
            strategy: "Focus on understanding the 'why' behind formulas, not just memorizing them. Practice chain rule until it's second nature.",
            timeManagement: "Do the homework the day it's assigned. Don't let concepts pile up.",
            mistakes: ["Falling behind on homework", "Not asking questions when confused about limits", "Relying too much on the calculator"],
            pastStudentWisdom: ["The unit circle is your best friend.", "Don't skip the optimization word problems."],
        },
        resources: {
            practice: [
                { title: "Khan Academy AP Calc AB", url: "https://khanacademy.org" },
                { title: "Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu/" },
                { title: "College Board Past FRQs", url: "#" },
                { title: "DeltaMath", url: "#" },
                { title: "Albert.io Calculus", url: "#" }
            ],
            textbooks: [
                { title: "Calculus: Graphical, Numerical, Algebraic", url: "#" },
                { title: "Barron's AP Calculus Premium", url: "#" },
                { title: "Princeton Review AP Calculus", url: "#" }
            ],
            schedules: [
                { title: "4-Week AP Exam Study Plan", url: "#" },
                { title: "Unit 1-3 Review Schedule", url: "#" },
                { title: "Weekend Cram Sheet", url: "#" }
            ],
            videos: [
                { title: "3Blue1Brown: Essence of Calculus", url: "#" },
                { title: "Professor Leonard", url: "#" },
                { title: "Organic Chemistry Tutor - Calc", url: "#" }
            ]
        },
        classAdvice: {
            noteTaking: "Copy down every example problem step-by-step.",
            focus: "Pay attention when he explains the 'why' of a theorem.",
            preparation: "Review the previous day's notes for 5 minutes before class.",
        },
        studentQuotes: [
            { category: "Study Tips", text: "Do practice problems until you dream about derivatives.", author: "Class of '24" },
            { category: "Test Prep", text: "Start reviewing for the AP exam in March.", author: "Class of '23" },
            { category: "Mental Health", text: "It's okay to get a C on a test. Just learn from it.", author: "Class of '25" },
        ],
        scenarios: [],
        situationGuides: {
            "confused": {
                advice: "Don't panic. Calculus builds on itself. Go back to the unit circle and limits. If those are shaky, everything else will be too.",
                chatbotContext: "The student is confused. Focus on breaking down concepts into very simple steps. Avoid jargon. Suggest visual resources like 3Blue1Brown.",
                priorityAction: "Watch 'Essence of Calculus' Chapter 1"
            },
            "low-scores": {
                advice: "You likely understand the concept but are failing the algebra or the specific AP-style wording. Practice FRQs specifically.",
                chatbotContext: "The student understands concepts but scores low. Focus on test-taking strategies, common pitfalls, and algebra mistakes.",
                priorityAction: "Do 3 FRQs from 2018 with a timer"
            },
            "behind": {
                advice: "Stop trying to do every single homework problem. Focus on the odd numbers to cover ground faster. You need to catch up on the big ideas first.",
                chatbotContext: "The student is behind. Help them prioritize. Suggest skipping minor details to catch up on major units.",
                priorityAction: "Read the Chapter Summaries for the last 2 units"
            },
            "high-achiever": {
                advice: "To get a 5, you need to master the 'justification' points on FRQs. It's not enough to get the number right.",
                chatbotContext: "The student wants a 5. Challenge them with hard problems. Focus on rigorous mathematical justification and notation.",
                priorityAction: "Review the AP Scoring Guidelines for FRQs"
            },
            "overwhelmed": {
                advice: "Take a breath. You don't need to know everything today. Just master ONE derivative rule tonight.",
                chatbotContext: "The student is overwhelmed. Be very supportive and encouraging. Give small, manageable tasks.",
                priorityAction: "Do 5 minutes of breathing, then 1 problem"
            }
        }
    },
    {
        id: "ap-chemistry",
        title: "AP Chemistry",
        subject: "Science",
        description: "A college-level chemistry course covering atomic structure, bonding, kinetics, thermodynamics, and equilibrium.",
        teachers: [
            {
                name: "Dr. Brown",
                style: "Fast-paced, expects independent study",
                strengths: ["Extremely knowledgeable", "Prepares you well for college", "Fair grader"],
            },
        ],
        successTips: {
            strategy: "Read the textbook before the lecture. Labs are crucial for understanding.",
            timeManagement: "Dedicate at least 30 minutes a day to review.",
            mistakes: ["Cramming for tests", "Ignoring significant figures", "Not understanding stoichiometry"],
            pastStudentWisdom: ["Stoichiometry is everywhere. Master it early.", "Don't be afraid to ask for help."],
        },
        resources: {
            practice: [
                { title: "AP Classroom", url: "#" },
                { title: "ScienceGeek.net", url: "#" },
                { title: "ChemCollective Virtual Labs", url: "#" }
            ],
            textbooks: [
                { title: "Chemistry: The Central Science", url: "#" },
                { title: "Zumdahl Chemistry", url: "#" }
            ],
            schedules: [
                { title: "Semester 1 Pacing Guide", url: "#" },
                { title: "Lab Report Checklist", url: "#" }
            ],
            videos: [
                { title: "Tyler DeWitt", url: "#" },
                { title: "Melissa Maribel", url: "#" },
                { title: "Bozeman Science", url: "#" }
            ]
        },
        classAdvice: {
            noteTaking: "Annotate the slides if provided.",
            focus: "Focus on the exceptions to the rules.",
            preparation: "Read the lab procedure the night before.",
        },
        studentQuotes: [
            { category: "Study Tips", text: "Flashcards for polyatomic ions are a lifesaver.", author: "Class of '24" },
            { category: "Mental Health", text: "Don't pull all-nighters. Sleep helps you remember.", author: "Class of '23" },
        ],
        scenarios: [],
        situationGuides: {
            "confused": {
                advice: "Chemistry is abstract. Try to visualize the molecules. Use PhET simulations to see what's happening.",
                chatbotContext: "Student is confused. Use analogies. Explain things at a particle level.",
                priorityAction: "Play with a PhET simulation for the current unit"
            },
            "low-scores": {
                advice: "You might be memorizing instead of understanding. AP Chem requires applying concepts to new situations.",
                chatbotContext: "Student has low scores. Focus on application questions and 'explain your reasoning' prompts.",
                priorityAction: "Explain a concept out loud to a rubber duck"
            },
            "behind": {
                advice: "Focus on Stoichiometry and Bonding. If you miss those, the rest of the year is impossible.",
                chatbotContext: "Student is behind. Emphasize the foundational units (Stoich, Bonding, IMF).",
                priorityAction: "Drill Stoichiometry problems"
            },
            "high-achiever": {
                advice: "Pay attention to significant figures and units in every single calculation. That's where points are lost.",
                chatbotContext: "Student wants a 5. Nitpick their significant figures and unit conversions.",
                priorityAction: "Do a practice test with strict timing"
            },
            "overwhelmed": {
                advice: "Focus on one unit at a time. Don't look at the whole mountain.",
                chatbotContext: "Student is overwhelmed. Break tasks down. Focus on vocabulary first.",
                priorityAction: "Make flashcards for current unit vocabulary"
            }
        }
    },
    {
        id: "honors-physics",
        title: "Honors Physics",
        subject: "Science",
        description: "Algebra-based physics covering mechanics, waves, electricity, and magnetism.",
        teachers: [
            {
                name: "Mrs. Davis",
                style: "Hands-on labs and demonstrations",
                strengths: ["Fun labs", "Relatable examples", "Good sense of humor"],
            },
        ],
        successTips: {
            strategy: "Draw free-body diagrams for everything.",
            timeManagement: "Labs take longer than you think to write up.",
            mistakes: ["Mixing up units", "Forgetting negative signs for direction"],
            pastStudentWisdom: ["F=ma is the answer to 50% of questions.", "Understand the concepts, don't just plug and chug."],
        },
        resources: {
            practice: [
                { title: "Physics Classroom", url: "#" },
                { title: "Giancoli Answers", url: "#" }
            ],
            textbooks: [
                { title: "Conceptual Physics", url: "#" }
            ],
            schedules: [
                { title: "Formula Sheet Memorization Plan", url: "#" }
            ],
            videos: [
                { title: "Flipping Physics", url: "#" },
                { title: "Crash Course Physics", url: "#" }
            ]
        },
        classAdvice: {
            noteTaking: "Sketch the diagrams she draws on the board.",
            focus: "Watch the demos closely.",
            preparation: "Bring your calculator every day.",
        },
        studentQuotes: [
            { category: "Study Tips", text: "Practice rearranging equations without numbers first.", author: "Class of '25" },
        ],
        scenarios: [],
        situationGuides: {
            "confused": {
                advice: "Physics is just math with real-world rules. Draw a picture. Always draw a picture.",
                chatbotContext: "Student is confused. Ask them to describe the physical situation before doing any math.",
                priorityAction: "Draw a Free Body Diagram"
            },
            "low-scores": {
                advice: "Check your algebra. Most physics mistakes are actually algebra mistakes.",
                chatbotContext: "Student has low scores. Check their algebra skills and unit conversions.",
                priorityAction: "Review algebra manipulation of variables"
            },
            "behind": {
                advice: "Focus on Newton's Laws. They are the foundation of everything.",
                chatbotContext: "Student is behind. Focus on F=ma and conservation laws.",
                priorityAction: "Review Newton's 3 Laws"
            },
            "high-achiever": {
                advice: "Try to derive the formulas yourself. Understand where they come from.",
                chatbotContext: "Student wants an A. Challenge them with conceptual questions that require no math.",
                priorityAction: "Derive a kinematic equation"
            },
            "overwhelmed": {
                advice: "Just write down what you know (the variables given) and what you need to find.",
                chatbotContext: "Student is overwhelmed. Guide them through the GUESS method (Given, Unknown, Equation, Substitute, Solve).",
                priorityAction: "List your 'Given' variables"
            }
        }
    },
    {
        id: "ap-world-history",
        title: "AP World History",
        subject: "History",
        description: "Study the cultural, economic, political, and social developments that have shaped the world from c. 1200 CE to the present.",
        teachers: [
            {
                name: "Mr. Wilson",
                style: "Storyteller, lecture-based",
                strengths: ["Makes history come alive", "Connects past to present", "Passionate"],
            },
        ],
        successTips: {
            strategy: "Focus on themes and connections (SPICE-T), not just dates.",
            timeManagement: "Spread the reading out over the week.",
            mistakes: ["Procrastinating on the reading", "Not learning how to write a DBQ"],
            pastStudentWisdom: ["Heimler's History is a godsend.", "Learn the rubric for the essays."],
        },
        resources: {
            practice: [
                { title: "Albert.io World History", url: "#" },
                { title: "Fiveable", url: "#" }
            ],
            textbooks: [
                { title: "Ways of the World", url: "#" },
                { title: "AMSCO", url: "#" }
            ],
            schedules: [
                { title: "8-Week Review Plan", url: "#" },
                { title: "Reading Schedule", url: "#" }
            ],
            videos: [
                { title: "Heimler's History", url: "#" },
                { title: "Crash Course World History", url: "#" }
            ]
        },
        classAdvice: {
            noteTaking: "Use the Cornell method.",
            focus: "Listen for cause and effect relationships.",
            preparation: "Skim the chapter before class.",
        },
        studentQuotes: [
            { category: "Test Prep", text: "Heimler's History. That's it. That's the tweet.", author: "Class of '24" },
        ],
        scenarios: [],
        situationGuides: {
            "confused": {
                advice: "Don't get lost in the names and dates. Focus on the big trends (Trade, Empires, Religion).",
                chatbotContext: "Student is confused. Zoom out to the big picture. Focus on SPICE-T themes.",
                priorityAction: "Watch a Unit Review Video"
            },
            "low-scores": {
                advice: "You probably aren't writing the essays correctly. The rubric is very specific.",
                chatbotContext: "Student has low scores. Focus on writing structure (Thesis, Contextualization, Evidence).",
                priorityAction: "Review the DBQ Rubric"
            },
            "behind": {
                advice: "Stop reading every word of the textbook. Read the headings and the first/last sentence of paragraphs.",
                chatbotContext: "Student is behind. Teach skimming strategies. Focus on main ideas.",
                priorityAction: "Skim the current chapter"
            },
            "high-achiever": {
                advice: "Complexity point! Connect what's happening in this region to another region in the same time period.",
                chatbotContext: "Student wants a 5. Push for complexity and synthesis in their arguments.",
                priorityAction: "Write a practice Thesis with Complexity"
            },
            "overwhelmed": {
                advice: "Just watch Heimler's History. Seriously.",
                chatbotContext: "Student is overwhelmed. Direct them to Heimler's History videos.",
                priorityAction: "Watch one Heimler video"
            }
        }
    },
];
