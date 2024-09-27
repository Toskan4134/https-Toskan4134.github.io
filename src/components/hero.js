import React from 'react';
import { Button } from './button';
import { motion } from 'framer-motion';
const Hero = ({
    name,
    subtitle,
    description,
    imageSrc,
    contactRef,
    projectsRef,
    alt,
}) => {
    return (
        <div className='flex flex-col-reverse md:flex-row items-center justify-around gap-6'>
            <div className='text-center'>
                <motion.h1
                    className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {name}
                </motion.h1>
                <h5 className='mt-1 text-l font-bold md:text-xl '>
                    {subtitle}
                </h5>
                <motion.p
                    className='mt-4 max-w-[600px] text-muted-foreground md:text-xl'
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {description}
                </motion.p>
                <motion.div
                    className='mt-4 flex space-x-4 justify-center'
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            onClick={() => {
                                contactRef?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            Contáctame
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant='outline'
                            onClick={() => {
                                projectsRef?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                            }}
                        >
                            Ver Proyectos
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <img
                        src={imageSrc}
                        alt={alt}
                        width={350}
                        height={350}
                        style={{
                            maskImage:
                                'linear-gradient(black 80%, transparent 100%)',
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Hero;
