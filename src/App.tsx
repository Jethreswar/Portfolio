import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import "./styles/loading.css";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="loadingContainer">
        <div className="animation">
          <div className="ball animationBall"></div>
          <div className="containerRect">
            <div className="rect animationRect"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  image,
  delay,
}: {
  title: string;
  description: string;
  image: string;
  delay: number;
}) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.02, rotate: 2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}

function SkillItem({
  skill,
  index,
}: {
  skill: { name: string; level: number };
  index: number;
}) {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium text-white">{skill.name}</span>
        <span className="text-blue-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
}

function WorkItem({
  title,
  description,
  image,
  hidden = false,
}: {
  title: string;
  description: string;
  image: string;
  hidden?: boolean;
}) {
  return (
    <motion.div
      className={`work ${hidden ? "work-hidden" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <img src={image} alt={title} />
      <div className="layer">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href="#">
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </motion.div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAllWork, setShowAllWork] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      title: "AI Image Generator",
      description: "Web application that generates images using AI",
      image:
        "https://images.unsplash.com/photo-1547954575-855750c57bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const skills = [
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 88 },
    { name: "Python", level: 82 },
    { name: "GraphQL", level: 75 },
    { name: "Docker", level: 80 },
  ];

  const workItems = [
    {
      title: "Web Development",
      description:
        "Creating web applications for users with HTML, CSS, and JavaScript",
      image: "/public/work-1.png",
    },
    {
      title: "Data Mining",
      description:
        "Creating machine learning models for data analysis and predictions",
      image: "/public/work-2.png",
    },
    {
      title: "Database Systems",
      description:
        "Creating databases for data storage and retrieval of data from web applications",
      image: "/public/work-3.png",
    },
    {
      title: "Web Information Retrieval",
      description:
        "Creating search engines for users to search for information by extracting data from the web",
      image: "/images/work-4.png",
      hidden: true,
    },
    {
      title: "Data Analytics for Security",
      description:
        "Creating data analytics models for security purposes to detect malicious activities across the web",
      image: "/public/work-5.png",
      hidden: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Hero Section */}
      <motion.header
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Jethreshwar Varada
          </motion.h1>
          <motion.h2
            className="text-2xl text-blue-400 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Full Stack Developer
          </motion.h2>
          <motion.div
            className="flex space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </motion.header>

      {/* Projects Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            My Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} delay={0.2 * index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {skills.map((skill, index) => (
              <SkillItem key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-20 bg-gray-800" id="portfolio">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12 text-center sub-title">
            My Work
          </h1>
          <div className="work-list">
            {workItems.map((work, index) => (
              <WorkItem
                key={index}
                {...work}
                hidden={work.hidden && !showAllWork}
              />
            ))}
          </div>
          {!showAllWork ? (
            <motion.a
              className="btn"
              onClick={() => setShowAllWork(true)}
              whileHover={{ scale: 1.05 }}
            >
              View More
            </motion.a>
          ) : (
            <motion.a
              className="btn btn1"
              onClick={() => setShowAllWork(false)}
              whileHover={{ scale: 1.05 }}
            >
              View Less
            </motion.a>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
