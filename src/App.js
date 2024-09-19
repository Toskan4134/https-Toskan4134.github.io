import { useEffect, useState, useCallback } from 'react';
import { Button } from './components/button';
import Header from './components/header';
import ProjectCard from './components/projectCard';
import SkillCard from './components/skillCard';
import Hero from './components/hero';
import yoCartoon from './assets/YoCartoonWide.png';
import ExperienceCard from './components/experienceCard';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, TwitterIcon } from 'lucide-react';
import { skills, projects, experience } from './lib/lists';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    fadeIn,
    staggerChildrenSlow,
    staggerChildrenFast,
} from './lib/motions';
import Footer from './components/footer';

function App() {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [visibleSkillsCount, setVisibleSkillsCount] = useState(8);
    const [defaultVisibleSkillsCount, setDefaultVisibleSkillsCount] =
        useState(8);
    const [animatingSkills, setAnimatingSkills] = useState(false);

    const [startRef, setStartRef] = useState(null);
    const [skillsRef, setSkillsRef] = useState(null);
    const [experienceRef, setExperienceRef] = useState(null);
    const [projectsRef, setProjectsRef] = useState(null);
    const [contactRef, setContactRef] = useState(null);

    const handleResize = useCallback(() => {
        const windowWidth = window.innerWidth;
        let columns;

        if (windowWidth >= 1024) {
            columns = 4;
        } else if (windowWidth >= 768) {
            columns = 3;
        } else if (windowWidth >= 420) {
            columns = 2;
        } else {
            columns = 1;
        }

        const rows = 2;
        const newVisibleCount = columns * rows;
        setVisibleSkillsCount(newVisibleCount);
        setDefaultVisibleSkillsCount(newVisibleCount);
        setShowAllSkills(false);
    }, []);

    useEffect(() => {
        setMounted(true);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useEffect(() => {
        if (animatingSkills) {
            const targetCount = showAllSkills
                ? skills.length
                : defaultVisibleSkillsCount;
            const step = showAllSkills ? 1 : -1;
            const interval = setInterval(() => {
                setVisibleSkillsCount((prev) => {
                    if (
                        (showAllSkills && prev >= targetCount) ||
                        (!showAllSkills && prev <= targetCount)
                    ) {
                        clearInterval(interval);
                        setAnimatingSkills(false);
                        return targetCount;
                    }
                    return prev + step;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [animatingSkills, showAllSkills, defaultVisibleSkillsCount]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 125,
        damping: 45,
        restDelta: 0.001,
    });

    if (!mounted) {
        return null;
    }

    const visibleSkills = skills.slice(0, visibleSkillsCount);

    const toggleSkills = () => {
        setShowAllSkills((prev) => !prev);
        setAnimatingSkills(true);
    };

    return (
        <div
            className={`App ${theme} flex flex-col items-center content-center flex-wrap bg-background text-foreground`}
            ref={setStartRef}
        >
            <motion.div
                className='fixed top-0 left-0 right-0 h-1 bg-primary z-50'
                style={{ scaleX }}
            />
            <Header
                theme={theme}
                setTheme={setTheme}
                refs={{
                    startRef,
                    skillsRef,
                    experienceRef,
                    projectsRef,
                    contactRef,
                }}
            />
            <main className='container py-6 max-w-[1200px] px-4'>
                <motion.section
                    id='hero'
                    className='py-8 md:py-14'
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Hero
                        name='Ángel Gaudes Martí'
                        subtitle='Toskan4134'
                        description='Desarrollador Full Stack apasionado por aprender cosas nuevas. Especializado en Node.js y bases de datos MongoDB.'
                        imageSrc={yoCartoon}
                        contactRef={contactRef}
                        projectsRef={projectsRef}
                    />
                </motion.section>
                <motion.section
                    id='skills'
                    className='py-8 md:py-14'
                    ref={setSkillsRef}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className='text-3xl font-bold mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        Skills
                    </motion.h2>
                    <motion.div
                        variants={staggerChildrenFast}
                        initial='initial'
                        animate={showAllSkills ? 'animate' : false}
                        whileInView='animate'
                        viewport={{ once: true }}
                        className='grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                    >
                        <AnimatePresence>
                            {visibleSkills.map((skill) => (
                                <SkillCard
                                    key={skill.name}
                                    skill={skill.name}
                                    level={skill.level}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    {skills.length > defaultVisibleSkillsCount && (
                        <motion.div
                            className='mt-8 text-center'
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={() => {
                                        const rect =
                                            skillsRef?.getBoundingClientRect();
                                        const scrollTop =
                                            window.pageYOffset ||
                                            document.documentElement.scrollTop;

                                        if (
                                            showAllSkills &&
                                            window.pageYOffset >
                                                rect.top + scrollTop
                                        ) {
                                            skillsRef?.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                        } else if (
                                            !showAllSkills &&
                                            window.pageYOffset <
                                                rect.top + scrollTop
                                        ) {
                                            skillsRef?.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                        }
                                        toggleSkills();
                                    }}
                                >
                                    {showAllSkills
                                        ? 'Mostrar menos'
                                        : 'Mostrar más'}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </motion.section>

                <motion.section
                    id='projects'
                    className='py-8 md:py-14'
                    ref={setProjectsRef}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className='text-3xl font-bold mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Proyectos
                    </motion.h2>
                    <motion.div
                        className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                        variants={staggerChildrenSlow}
                        initial='initial'
                        whileInView='animate'
                        viewport={{ once: true }}
                    >
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                title={project.title}
                                description={project.description}
                                image={project.image}
                                github={project.github}
                                web={project.web}
                            />
                        ))}
                    </motion.div>
                    <motion.div
                        className='mt-8 text-center'
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button>
                                <Github className='mr-2 h-4 w-4' />
                                <Link
                                    to={
                                        'https://github.com/Toskan4134?tab=repositories'
                                    }
                                >
                                    Ver más
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.section>

                <motion.section
                    id='experience'
                    className='py-8 md:py-14'
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    ref={setExperienceRef}
                >
                    <motion.h2
                        className='text-3xl font-bold mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Experiencia
                    </motion.h2>
                    <motion.div
                        className='space-y-6'
                        variants={staggerChildrenSlow}
                        initial='initial'
                        whileInView='animate'
                        viewport={{ once: true }}
                    >
                        {experience.map((job) => (
                            <ExperienceCard
                                key={job.company}
                                position={job.position}
                                company={job.company}
                                period={job.period}
                                description={job.description}
                                website={job.website}
                                location={job.location}
                            />
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section
                    id='contact'
                    className='py-8 md:py-14'
                    ref={setContactRef}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className='text-3xl font-bold mb-8'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        Contacto
                    </motion.h2>
                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-2 gap-6'
                        variants={staggerChildrenSlow}
                        initial='initial'
                        whileInView='animate'
                        viewport={{ once: true }}
                    >
                        <motion.div
                            variants={fadeIn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                variant='outline'
                                className='w-full'
                            >
                                <Link to='mailto:angama4134@gmail.com'>
                                    <Mail className='mr-2 h-6 w-6' />
                                    angama4134@gmail.com
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={fadeIn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                variant='outline'
                                className='w-full'
                            >
                                <Link to='https://github.com/toskan4134'>
                                    <Github className='mr-2 h-6 w-6' />
                                    GitHub
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={fadeIn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                variant='outline'
                                className='w-full'
                            >
                                <Link to='https://www.linkedin.com/in/angel-gaudes/'>
                                    <Linkedin className='mr-2 h-6 w-6' />
                                    LinkedIn
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            variants={fadeIn}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                asChild
                                variant='outline'
                                className='w-full'
                            >
                                <Link to='https://x.com/Toskan4134'>
                                    <TwitterIcon className='mr-2 h-6 w-6' />X /
                                    Twitter
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </main>
            <footer className='border-t py-6'>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
