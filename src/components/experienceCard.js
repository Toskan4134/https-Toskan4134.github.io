import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from './card';
import { Globe, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeIn } from '../lib/motions';
import { motion } from 'framer-motion';
const ExperienceCard = ({
    position,
    company,
    period,
    description,
    website,
    location,
}) => {
    return (
        <motion.div key={company} variants={fadeIn}>
            <Card>
                <CardHeader>
                    <CardTitle>{position}</CardTitle>
                    <CardDescription>
                        {company} | {period}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='mb-4 whitespace-pre-line'>{description}</p>
                    <div className='flex flex-wrap gap-4'>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center'>
                            <Globe className='mr-2 h-4 w-4' />
                            <Link
                                href={website}
                                className='text-sm hover:underline'
                            >
                                {website}
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='flex items-center'>
                            <MapPin className='mr-2 h-4 w-4' />
                            <span className='text-sm'>{location}</span>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ExperienceCard;
