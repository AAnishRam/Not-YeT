import { FileImage } from "lucide-react";
import { Printer } from "lucide-react";
import { TvMinimalPlay } from "lucide-react";
import { ReceiptText } from "lucide-react";
import { BookOpenCheck } from "lucide-react";
import { Italic } from "lucide-react";

import user1 from "../../assets/Images/profile-pictures/user1.jpg";
import user2 from "../../assets/Images/profile-pictures/user2.jpg";
import user3 from "../../assets/Images/profile-pictures/user3.jpg";
import user4 from "../../assets/Images/profile-pictures/user4.jpg";
import user5 from "../../assets/Images/profile-pictures/user5.jpg";
import user6 from "../../assets/Images/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#services" },
  { label: "About Us", href: "#aboutus" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const testimonials = [
  {
    user: "Akhil Menon",
    job: "Team Lead",
    image: user1,
    text: "NOT YET has revolutionized our team's productivity and collaboration. Their intuitive platform has streamlined our workflows, and we've seen significant improvements in project delivery times.",
  },
  {
    user: "Anitha N",
    job: "Project Manager",
    image: user2,
    text: "NOT YET's customizable dashboards and seamless integration with existing tools have transformed our project management processes. We're now more efficient and effective than ever.",
  },
  {
    user: "Rahul P",
    job: "CEO",
    image: user3,
    text: "NOT YET's collaborative workspace has been a game-changer for our organization. We've enhanced communication, reduced meetings, and increased overall productivity.",
  },
  {
    user: "Laksmi Mohan",
    job: "Scrum Master",
    image: user4,
    text: "NOT YET's agile project planning features have helped us deliver high-quality products faster. Their platform is flexible, scalable, and perfectly suited for our development team.",
  },
  {
    user: "Priya Rajan",
    job: "Design Lead",
    image: user5,
    text: "NOT YET's real-time collaboration tools have streamlined our design process, reducing feedback loops and increasing overall team satisfaction.",
  },
  {
    user: "Arjun Varma",
    job: "Product Owner",
    image: user6,
    text: "NOT YET's data analytics and reporting features provide valuable insights into our team's performance. We're now making data-driven decisions to drive business growth.",
  },
];

export const services = [
  {
    icon: <FileImage />,
    text: "Collaborative Workspace",
    description:
      "Bring your team together in a centralized platform, enhancing communication, productivity, and project delivery.",
  },
  {
    icon: <TvMinimalPlay />,
    text: "Virtual Meetings",
    description:
      "Conduct seamless virtual meetings, brainstorming sessions, and training programs, fostering global collaboration and knowledge sharing.",
  },
  {
    icon: <ReceiptText />,
    text: "Task Management",
    description:
      "Streamline project workflows, assign tasks, track progress, and set deadlines, ensuring efficient project delivery.",
  },
  {
    icon: <BookOpenCheck />,
    text: "Knowledge Base",
    description:
      "Create a centralized knowledge repository, sharing best practices, documentation, and resources across your organization.",
  },
  {
    icon: <Italic />,
    text: "Custom Integrations",
    description:
      "Seamlessly integrate NOT YET with your existing tools and platforms, enhancing workflow automation and productivity.",
  },
  {
    icon: <Printer />,
    text: "Data Analytics",
    description:
      "Gain valuable insights into team performance, project progress, and business growth, making data-driven decisions.",
  },
];

export const aboutUs = [
  {
    title: "Company Overview",
    description:
      "NOT YET is a cutting-edge collaborative workspace platform designed to enhance organizational productivity, communication, and project delivery. Our mission is to empower teams worldwide.",
  },
  {
    title: "Our Mission",
    description:
      "At NOT YET, we strive to revolutionize the way teams collaborate, creating a more efficient, productive, and connected work environment.",
  },
  {
    title: "Core Values",
    description:
      "We value innovation, teamwork, customer satisfaction, and continuous improvement. Our platform reflects these values, ensuring exceptional user experiences.",
  },
  {
    title: "Why Choose NOT YET?",
    description:
      "Choose NOT YET for its intuitive interface, scalable architecture, and commitment to customer success. Transform your team's productivity and collaboration today.",
  },
  {
    title: "Our Commitment",
    description:
      "We're dedicated to delivering exceptional service, ensuring seamless integration, and providing ongoing support to empower your team's success.",
  },
];
