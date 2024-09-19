import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { fadeIn } from '../lib/motions';
import { motion } from 'framer-motion';
const SkillCard = ({ skill, level }) => {
    const skills = {
        1: 'Básico',
        2: 'Intermedio',
        3: 'Avanzado',
    };
    return (
        <motion.div
            className='h-full'
            variants={fadeIn}
            exit={{ opacity: 0, scale: 0.8, display: 'none' }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Card className='flex flex-col items-center justify-center h-full'>
                <CardHeader className='pb-2 text-center'>
                    <CardTitle>{skill}</CardTitle>
                </CardHeader>
                <CardContent className='pt-2'>
                    <div className='flex items-center space-x-2 mb-2 justify-center'>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`w-3 h-3 rounded-full border border-primary ${
                                level >= 1 ? 'bg-primary' : 'bg-muted'
                            }`}
                        ></motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`w-3 h-3 rounded-full border border-primary ${
                                level >= 2 ? 'bg-primary' : 'bg-muted'
                            }`}
                        ></motion.div>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            className={`w-3 h-3 rounded-full border border-primary ${
                                level >= 3 ? 'bg-primary' : 'bg-muted'
                            }`}
                        ></motion.div>
                    </div>
                    <p className='text-sm text-muted-foreground text-center'>
                        {skills[level]}
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SkillCard;
