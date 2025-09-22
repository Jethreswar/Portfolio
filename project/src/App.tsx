import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  User,
  Send,
  Phone,
  MessageSquare,
  Home,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
// import useMailtoFallback from "./hooks/useMailtoFallback";
import FormspreeContactForm from "./components/FormspreeContactForm";
// import ParticlesBackground from "./components/ParticlesBackground";
import AnimateOnScroll from "./components/AnimateOnScroll";
// import AnimatedText from "./components/AnimatedText";
import TiltCard from "./components/TiltCard";

function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-blue-400 font-medium"
        >
          Loading Portfolio...
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectCard({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <TiltCard
      className="overflow-hidden rounded-lg shadow-lg h-full"
      tiltAmount={5}
      glareOpacity={0.1}
      perspective={1200}
    >
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-blue-500/30 transition-all duration-500 border border-gray-700 hover:border-blue-500/50 h-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
      >
        <div className="relative overflow-hidden group">
          <div className="bg-blue-500/20 h-16 flex items-center justify-center">
            <div className="h-1 w-36 bg-blue-500/40 rounded-full mb-2"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
          <motion.div
            className="absolute bottom-0 left-0 p-4 w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
          </motion.div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-gray-300 flex-grow">{description}</p>
          <div className="mt-6 flex justify-end">
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Details</span>
              <ExternalLink size={16} className="ml-2" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// Skill category component
interface SkillCategory {
  category: string;
  skills: Array<{ name: string; icon: string }>;
  icon: string;
  color: string;
}

function SkillCategoryCard({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimateOnScroll animation="slideUp" delay={index * 0.1} className="h-full">
      <motion.div
        className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-500 h-full shadow-lg hover:shadow-blue-500/10"
        whileHover={{
          y: -8,
          boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.2)",
          borderColor: "rgba(59, 130, 246, 0.5)",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex items-start mb-5">
          <motion.div
            className={`w-12 h-12 mr-4 ${category.color} rounded-lg p-2 flex items-center justify-center flex-shrink-0`}
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered
                ? "0 0 15px rgba(59, 130, 246, 0.5)"
                : "none",
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={category.icon}
              alt={`${category.category} icon`}
              className="max-w-full max-h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://ui-avatars.com/api/?name=${
                  category.category.split(" ")[0]
                }&background=3B82F6&color=fff&size=128`;
              }}
            />
          </motion.div>
          <div>
            <motion.h3
              className="text-xl font-bold text-white mb-1"
              animate={{
                color: isHovered ? "#93c5fd" : "#ffffff",
              }}
              transition={{ duration: 0.3 }}
            >
              {category.category}
            </motion.h3>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{
                width: isHovered ? "80px" : "50px",
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {category.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="flex flex-col items-center bg-gray-900/50 rounded-lg p-3 hover:bg-gray-900 transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i + index * 0.05 }}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                  backgroundColor: "rgba(30, 41, 59, 0.9)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="w-8 h-8 mb-2 flex items-center justify-center">
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${skill.name}&background=3B82F6&color=fff&size=128`;
                    }}
                  />
                </div>
                <span className="text-gray-300 text-xs font-medium text-center">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimateOnScroll>
  );
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
      <div className="absolute w-full h-full">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full"
            style={{
              width: Math.random() * 6 + 1,
              height: Math.random() * 6 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 8 + 7,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface CertificationProps {
  title: string;
  issuer: string;
  bgColor: string;
  icon?: string;
  delay?: number;
}

function CertificationCard({
  title,
  issuer,
  bgColor,
  icon,
  delay = 0,
}: CertificationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard className="h-full" tiltAmount={8}>
      <motion.div
        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-500 border border-gray-700 hover:border-blue-500/50 relative h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className={`h-2 w-full ${bgColor.replace("/20", "")}`}></div>
        <div className="p-6 text-center">
          <motion.div
            className={`${bgColor} rounded-xl w-20 h-20 p-4 flex items-center justify-center mx-auto mb-6 shadow-lg`}
            animate={{
              y: isHovered ? -8 : 0,
              scale: isHovered ? 1.1 : 1,
              boxShadow: isHovered
                ? "0 10px 25px rgba(59, 130, 246, 0.3)"
                : "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {icon ? (
              <img
                src={icon}
                alt={`${issuer} icon`}
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=${issuer}&background=3B82F6&color=fff&size=128`;
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-blue-500/40 rounded-md"></div>
            )}
          </motion.div>
          <motion.h3
            className="text-lg font-bold text-white"
            animate={{
              y: isHovered ? -3 : 0,
              color: isHovered ? "#93c5fd" : "#ffffff",
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-blue-400 text-sm mt-2"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {issuer}
          </motion.p>

          <motion.div
            className="mt-6 w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-3"></div>
            <div className="flex justify-center space-x-2">
              <motion.button
                className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-1 px-3 rounded-full flex items-center"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View</span>
                <ExternalLink size={12} className="ml-1" />
              </motion.button>
              <motion.button
                className="text-xs bg-gray-700/80 hover:bg-gray-700 text-gray-300 py-1 px-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Verify
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize EmailJS
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const certifications = [
    {
      title: "Oracle Cloud Infrastructure Foundations Associate 2022",
      issuer: "Oracle",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    },
    {
      title: "Oracle Integration Cloud Professional 2022",
      issuer: "Oracle",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
    },
  ];

  const projects = [
    {
      title: "Transaction Processing Platform",
      description:
        "Spring Boot, Kotlin, WebFlux, ReactJS, Kafka | Architected microservices for transaction processing and account management with async APIs, improving throughput and reducing latency.",
    },
    {
      title: "Fraud Analytics System",
      description:
        "Spring Boot, Angular, PostgreSQL, Cassandra, Apache Camel | Built real-time fraud analytics platform processing 25K transactions/sec with less than 200ms response time, reducing detection latency from minutes to seconds.",
    },
    {
      title: "E-commerce Order Management",
      description:
        "Spring MVC, Spring Batch, Oracle PL/SQL, ReactJS, Kafka | Developed services to handle order lifecycle processes, optimizing queries and batch processing, reducing order processing delays by 25%.",
    },
  ];

  const skills = [
    {
      category: "Programming Languages",
      skills: [
        {
          name: "Java",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "Kotlin",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        },
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
        {
          name: "C",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "SQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
        {
          name: "CSS3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "bg-blue-500/20",
    },
    {
      category: "Java Technologies",
      skills: [
        {
          name: "Spring Boot",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Spring MVC",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Spring Security",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        },
        {
          name: "Hibernate",
          icon: "https://www.vectorlogo.zone/logos/hibernate/hibernate-icon.svg",
        },
        {
          name: "JDBC",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "Servlets",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "JSP",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "JAX-RS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        },
        {
          name: "Struts",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "bg-green-500/20",
    },
    {
      category: "Web Technologies",
      skills: [
        {
          name: "ReactJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        {
          name: "Redux",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        },
        {
          name: "Angular",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        },
        {
          name: "Vue.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        },
        {
          name: "NodeJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "jQuery",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
        },
        {
          name: "Bootstrap",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        },
        {
          name: "AJAX",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "bg-purple-500/20",
    },
    {
      category: "Databases",
      skills: [
        {
          name: "Oracle",
          icon: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg",
        },
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        },
        {
          name: "SQL Server",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "Cassandra",
          icon: "https://www.vectorlogo.zone/logos/apache_cassandra/apache_cassandra-icon.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "bg-red-500/20",
    },
    {
      category: "Cloud & DevOps",
      skills: [
        {
          name: "AWS",
          icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
        },
        {
          name: "Azure",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
        {
          name: "Kubernetes",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        },
        {
          name: "Jenkins",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        },
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "Maven",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
        },
        {
          name: "Gradle",
          icon: "https://www.vectorlogo.zone/logos/gradle/gradle-icon.svg",
        },
      ],
      icon: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
      color: "bg-yellow-500/20",
    },
    {
      category: "Messaging & Monitoring",
      skills: [
        {
          name: "Kafka",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
        },
        {
          name: "AWS SQS",
          icon: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
        },
        {
          name: "Apache Camel",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
        },
        {
          name: "Splunk",
          icon: "https://www.vectorlogo.zone/logos/splunk/splunk-icon.svg",
        },
        {
          name: "Dynatrace",
          icon: "https://www.vectorlogo.zone/logos/dynatrace/dynatrace-icon.svg",
        },
        {
          name: "SonarQube",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg",
        },
        {
          name: "Log4j",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
        },
      ],
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
      color: "bg-orange-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* Hero Section */}
      <motion.header
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900 animate-gradient-x"></div>
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-500 opacity-50"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 30 - 15],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 5 + 5,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Varada Jethreswar
          </motion.h1>
          <motion.h2
            className="text-2xl text-blue-400 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Sr. Full Stack Developer | Java/J2EE Expert | Cloud & Microservices
            Specialist
          </motion.h2>
          <motion.p
            className="text-xl mb-6 text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            Sr. Full Stack Developer with 8+ years of experience in Java/J2EE,
            Spring Boot, Microservices, and Cloud technologies across Banking,
            Financial, Retail, and Telecom domains.
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="https://github.com/Jethreswar"
              className="text-gray-400 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/jethreswar-varada-878281370/"
              className="text-gray-400 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:varadajet98@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
              title="Email"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
      </motion.header>

      {/* Projects Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} delay={0.2 * index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-900 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 max-w-2xl mx-auto">
              Expert in full-stack development with Java/J2EE, Spring Boot,
              Microservices, Hibernate, and RESTful/SOAP Web Services.
              Proficient in front-end technologies, event-driven architectures,
              database optimization, and cloud platforms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((category, index) => (
              <SkillCategoryCard
                key={category.category}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-10">
            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">EchoStar</h3>
                  <p className="text-blue-400">Sr. Full Stack Developer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">November 2023 – Present</p>
                  <p className="text-gray-400">Englewood, CO, USA</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Architected and developed Spring Boot microservices for
                  transaction processing and account management, ensuring
                  modular design, code reusability, and adherence to enterprise
                  security standards.
                </li>
                <li>
                  Refactored legacy Java services into Kotlin with Spring
                  WebFlux, introducing asynchronous, non-blocking APIs that
                  improved transaction throughput and reduced latency under
                  heavy load.
                </li>
                <li>
                  Designed and implemented ReactJS front-end applications with
                  reusable hooks and modular components, delivering intuitive
                  user interfaces for transaction workflows and account
                  services.
                </li>
                <li>
                  Implemented event-driven architecture using Kafka, creating
                  and managing topics, partitions, and consumer groups for
                  fault-tolerant, real-time communication between distributed
                  microservices.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    First Citizens Bank
                  </h3>
                  <p className="text-blue-400">Full Stack Developer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">July 2021 – October 2023</p>
                  <p className="text-gray-400">Los Angeles, CA, USA</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Built and deployed Spring Boot microservices to process
                  high-volume banking transactions (handling ~25K transactions
                  per second) with less than 200ms average response time.
                </li>
                <li>
                  Developed Angular dashboards with RxJS to deliver fraud alerts
                  and KPIs in near real time, reducing analyst response times by
                  35%.
                </li>
                <li>
                  Implemented Apache Camel routes to integrate with core banking
                  systems and external fraud scoring providers, improving
                  interoperability and reducing integration errors by 20%.
                </li>
                <li>
                  Architected PostgreSQL and Cassandra hybrid data storage,
                  enabling transactional consistency while scaling analytics to
                  billions of records with 99.99% availability.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Office Depot</h3>
                  <p className="text-blue-400">Software Developer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">September 2019 – June 2021</p>
                  <p className="text-gray-400">Boca Raton, FL, USA</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Developed Spring MVC services and Spring Batch jobs to handle
                  order lifecycle processes (checkout, invoicing, returns,
                  shipping) and improved order throughput during peak sale
                  periods.
                </li>
                <li>
                  Optimized Hibernate and Oracle PL/SQL layers: tuned queries,
                  indexes, and batch processing to reduce order processing
                  delays by 25%.
                </li>
                <li>
                  Built ReactJS components with a Flux and similar architecture
                  for dynamic customer order views and internal dashboards,
                  enhancing user feedback by reducing response times.
                </li>
                <li>
                  Integrated Apache Kafka for event-driven interactions among
                  inventory, payment, and shipping services to ensure consistent
                  state across systems and reduce stale data issues.
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Evoke Technologies
                  </h3>
                  <p className="text-blue-400">Java Developer</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">June 2017 – August 2019</p>
                  <p className="text-gray-400">Hyderabad, India</p>
                </div>
              </div>
              <ul className="list-disc pl-5 text-gray-400 space-y-2">
                <li>
                  Designed and developed interactive JSP forms with client-side
                  validation, ensuring accurate data capture and improved user
                  experience.
                </li>
                <li>
                  Built responsive presentation layers using HTML5, CSS3,
                  JavaScript, and Bootstrap, enhancing usability across multiple
                  browsers and devices.
                </li>
                <li>
                  Implemented business logic modules in Java with Spring Core
                  and MVC frameworks, using Bean wiring, Dispatcher Servlets,
                  Controllers, and View Resolvers.
                </li>
                <li>
                  Developed and consumed RESTful and SOAP-based web services,
                  deployed on WebLogic, with schema validation for SOAP requests
                  and JSON/XML handling for REST.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gray-900 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          <div className="space-y-10">
            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Binghamton University, State University of New York
                  </h3>
                  <p className="text-blue-400">
                    Master's in Information Systems
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Binghamton, NY, USA</p>
                </div>
              </div>
              <p className="text-white font-medium">
                Thomas J. Watson College of Engineering and Applied Science
              </p>
              <p className="text-gray-400 mt-2">
                Relevant Coursework: Python & Data Mining, Database Systems, Web
                & Database Security, Software Project Management, Large Language
                Models, Applied Machine Learning, Information Retrieval &
                Search.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    GITAM University
                  </h3>
                  <p className="text-blue-400">
                    Bachelor's in Electronics and Communication Engineering
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Visakhapatnam, AP, India</p>
                </div>
              </div>
              <p className="text-gray-400 mt-2">
                Relevant Coursework: Programming with C, Object Oriented
                Programming with C++, Introduction to Database Management
                Systems, Fundamentals of Data Structures, Computer Networks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-800 relative">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Certifications
          </motion.h2>

          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 max-w-2xl mx-auto">
              Professional Oracle cloud certifications demonstrating expertise
              in cloud infrastructure and integration services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.title}
                title={cert.title}
                issuer={cert.issuer}
                bgColor={cert.bgColor}
                icon={cert.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Me Section */}
      <section className="py-20 bg-gray-900 relative" id="contact">
        <BackgroundPattern />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Contact Me
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-gray-800 rounded-lg p-5 md:p-7 shadow-lg border border-gray-700 h-full flex flex-col"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-5">
                  Get In Touch
                </h3>

                <div className="space-y-5 flex-grow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                      <Mail className="text-blue-400" size={20} />
                    </div>
                    <div className="ml-4 max-w-full overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-300">
                        Email
                      </h4>
                      <a
                        href="mailto:varadajet98@gmail.com"
                        className="text-white hover:text-blue-400 transition-colors break-all text-sm md:text-base"
                      >
                        varadajet98@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                      <Phone className="text-blue-400" size={20} />
                    </div>
                    <div className="ml-4 max-w-full overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-300">
                        Phone
                      </h4>
                      <p className="text-white text-sm md:text-base">
                        +1 (607) 323-1064
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                      <User className="text-blue-400" size={20} />
                    </div>
                    <div className="ml-4 max-w-full overflow-hidden">
                      <h4 className="text-sm font-medium text-gray-300">
                        Location
                      </h4>
                      <p className="text-white text-sm md:text-base">
                        Binghamton, NY
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-4">
                    Connect With Me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/Jethreswar"
                      className="bg-gray-700 hover:bg-blue-600 transition-colors p-2 rounded-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jethreswar-varada-878281370/"
                      className="bg-gray-700 hover:bg-blue-600 transition-colors p-2 rounded-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <FormspreeContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Varada Jethreswar. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with React, TypeScript & Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
