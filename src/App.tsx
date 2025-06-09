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
      title: "Financial Data Analysis System",
      description:
        "Built a real-time financial data analysis platform using React, TypeScript, and AWS",
      image: "/public/work-1.png",
    },
    {
      title: "Healthcare Management Portal",
      description:
        "Developed a healthcare management system with patient data visualization using React and Node.js",
      image: "/public/work-2.png",
    },
    {
      title: "E-Commerce Recommendation Engine",
      description:
        "Created an AI-powered product recommendation engine for an e-commerce platform",
      image: "/public/work-3.png",
    },
  ];

  const skills = [
    { name: "React/React Native", level: 95 },
    { name: "TypeScript/JavaScript", level: 92 },
    { name: "Node.js/Express", level: 90 },
    { name: "Python", level: 88 },
    { name: "AWS/Cloud Services", level: 85 },
    { name: "CI/CD & DevOps", level: 82 },
    { name: "SQL/NoSQL Databases", level: 90 },
    { name: "System Design", level: 85 },
  ];

  const workItems = [
    {
      title: "Senior Software Engineer",
      description:
        "Led full-stack development of enterprise applications using React, TypeScript, and AWS services",
      image: "/public/work-1.png",
    },
    {
      title: "Software Developer",
      description:
        "Developed scalable microservices and RESTful APIs using Node.js and Express, improved system performance by 40%",
      image: "/public/work-2.png",
    },
    {
      title: "Full Stack Developer",
      description:
        "Built responsive web interfaces and backend systems with React, Node.js, and MongoDB",
      image: "/public/work-3.png",
    },
    {
      title: "Frontend Developer",
      description:
        "Created dynamic user interfaces with React and Redux, implemented responsive designs with Tailwind CSS",
      image: "/public/user.png",
      hidden: true,
    },
    {
      title: "Backend Engineer",
      description:
        "Designed and implemented RESTful APIs, serverless functions, and database systems for high-traffic applications",
      image: "/public/background.png",
      hidden: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Navigation */}
      <motion.nav
        className="bg-gray-800 py-4 px-6 sticky top-0 z-50 shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-xl font-bold text-blue-400">
            JV
          </a>
          <div className="hidden md:flex space-x-8">
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              href="#education"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Education
            </a>
            <a
              href="#portfolio"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Experience
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <img
              src="/public/user.png"
              alt="Jethreshwar Varada"
              className="w-48 h-48 rounded-full border-4 border-blue-500 object-cover"
            />
            <div>
              <motion.h1
                className="text-5xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Jethreshwar Varada
              </motion.h1>
              <motion.h2
                className="text-2xl text-blue-400 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Senior Software Engineer
              </motion.h2>
              <motion.p
                className="text-gray-300 max-w-2xl mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Experienced software engineer with expertise in full-stack development, cloud architecture,
                and building scalable applications. Passionate about creating elegant solutions to complex problems
                and delivering exceptional user experiences.
              </motion.p>
              <motion.div
                className="flex space-x-6 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <a
                  href="https://github.com/Jethreswar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github size={22} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/jethreshwar-varada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Linkedin size={22} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:jethreshwar@example.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail size={22} />
                  <span>Email</span>
                </a>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <a
                  href="/public/my-cv.pdf"
                  download
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors inline-flex items-center"
                >
                  Download Resume
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/public/background.png"
                alt="About Jethreshwar"
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Software Engineer & Problem Solver</h3>
              <p className="text-gray-300 mb-6">
                With over 5 years of experience in software development, I specialize in building
                scalable web applications and microservices. I'm passionate about creating innovative
                solutions that solve real-world problems.
              </p>
              <p className="text-gray-300 mb-6">
                I have a strong background in full-stack development, with expertise in React,
                TypeScript, Node.js, and cloud technologies. I enjoy working on challenging projects
                that push me to learn new technologies and improve my skills.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Location</h4>
                  <p className="text-gray-300">Los Angeles, CA</p>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Experience</h4>
                  <p className="text-gray-300">5+ Years</p>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Degree</h4>
                  <p className="text-gray-300">M.S. Computer Science</p>
                </div>
                <div>
                  <h4 className="text-blue-400 font-medium mb-2">Languages</h4>
                  <p className="text-gray-300">English, Hindi</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
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
      <section id="skills" className="py-20 bg-gray-900">
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

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              className="bg-gray-700 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-1">
                Master of Science in Computer Science
              </h3>
              <p className="text-blue-400 mb-3">
                University of Southern California | 2022 - 2024
              </p>
              <p className="text-gray-300">GPA: 3.8/4.0</p>
              <p className="text-gray-300 mt-2">
                Specialized in Artificial Intelligence and Software Engineering
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-700 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-white mb-1">
                Bachelor of Technology in Computer Science
              </h3>
              <p className="text-blue-400 mb-3">VIT University | 2018 - 2022</p>
              <p className="text-gray-300">GPA: 3.7/4.0</p>
              <p className="text-gray-300 mt-2">
                Coursework: Data Structures, Algorithms, Database Systems, Web
                Development
              </p>
            </motion.div>
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

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white">Jethreshwar Varada</h2>
              <p className="text-gray-400 mt-2">Senior Software Engineer</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a href="https://github.com/Jethreswar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com/in/jethreshwar-varada" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:jethreshwar@example.com" className="text-gray-400 hover:text-white">
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Jethreshwar Varada. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
