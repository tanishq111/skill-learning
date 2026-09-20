export const courses = [
  {
    id: "react-foundations",
    title: "React Foundations",
    category: "Web Development",
    level: "Beginner",
    instructor: "Maya Singh",
    lessonCount: 12,
    durationMinutes: 360,
    priceInr: 0,
    rating: 4.8,
    description:
      "Build accessible interfaces with components, props, state, and events.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    imageAlt: "A laptop displaying source code",
    skills: ["JSX", "Components", "State"],
    outline: ["React mental model", "Reusable components", "Stateful interfaces"],
  },
  {
    id: "node-api-design",
    title: "Practical Node API Design",
    category: "Backend Development",
    level: "Intermediate",
    instructor: "Arjun Mehta",
    lessonCount: 18,
    durationMinutes: 540,
    priceInr: 1499,
    rating: 4.7,
    description:
      "Design clear HTTP APIs with Express, validation, and reliable errors.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Rows of servers in a data center",
    skills: ["Node.js", "Express", "HTTP"],
    outline: ["HTTP contracts", "Express routing", "Validation and errors"],
  },
  {
    id: "ux-research-essentials",
    title: "UX Research Essentials",
    category: "Design",
    level: "Beginner",
    instructor: "Leena Kapoor",
    lessonCount: 10,
    durationMinutes: 300,
    priceInr: 799,
    rating: 4.9,
    description:
      "Plan interviews, identify patterns, and turn evidence into product decisions.",
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Design notes and color samples on a desk",
    skills: ["Interviews", "Synthesis", "Usability"],
    outline: ["Research questions", "User interviews", "Insight synthesis"],
  },
  {
    id: "digital-marketing-essentials",
    title: "Digital Marketing Essentials",
    category: "Marketing",
    level: "Beginner",
    instructor: "Nisha Rao",
    lessonCount: 15,
    durationMinutes: 420,
    priceInr: 999,
    rating: 4.6,
    description:
      "Create measurable campaigns across search, content, and social channels.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Analytics charts displayed on a laptop",
    skills: ["Campaigns", "Content", "Analytics"],
    outline: ["Audience strategy", "Channel planning", "Campaign measurement"],
  },
];

export const demoUsers = [
  {
    id: "user-student",
    name: "Aarav Sharma",
    email: "student@skillspring.dev",
    password: "learn123",
    role: "student",
    headline: "Frontend learner",
  },
  {
    id: "user-instructor",
    name: "Maya Singh",
    email: "instructor@skillspring.dev",
    password: "learn123",
    role: "instructor",
    headline: "Web development instructor",
  },
  {
    id: "user-admin",
    name: "Riya Verma",
    email: "admin@skillspring.dev",
    password: "learn123",
    role: "admin",
    headline: "Platform administrator",
  },
];

export const dashboardByRole = {
  student: {
    eyebrow: "Student dashboard",
    title: "Keep your learning moving",
    description: "Resume lessons, review progress, and choose what comes next.",
    stats: [
      { label: "Active courses", value: "2" },
      { label: "Lessons complete", value: "17" },
      { label: "Learning streak", value: "6 days" },
    ],
    activity: [
      "Continue React Foundations: Stateful interfaces",
      "Review feedback from the JSX knowledge check",
      "Explore a course for your next learning goal",
    ],
  },
  instructor: {
    eyebrow: "Instructor dashboard",
    title: "Shape the next learning experience",
    description: "Review course activity and prepare useful updates for learners.",
    stats: [
      { label: "Published courses", value: "3" },
      { label: "Active learners", value: "248" },
      { label: "Average rating", value: "4.8" },
    ],
    activity: [
      "Review quiz results for React Foundations",
      "Update the accessibility lesson draft",
      "Respond to five new learner questions",
    ],
  },
  admin: {
    eyebrow: "Admin dashboard",
    title: "Keep the platform healthy",
    description: "Monitor quality, users, and operational work across SkillSpring.",
    stats: [
      { label: "Active users", value: "1,284" },
      { label: "Courses in review", value: "7" },
      { label: "Open reports", value: "3" },
    ],
    activity: [
      "Review two instructor verification requests",
      "Resolve a reported course description",
      "Check this week's platform activity report",
    ],
  },
};
