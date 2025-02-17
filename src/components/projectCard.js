import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from './card';
import { Button } from './button';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motions';

const ProjectCard = ({
    title,
    description,
    image,
    github,
    web,
    imageWidth = 300,
    imageHeight = 200,
}) => {
    return (
        <motion.div key={title} variants={fadeIn} whileHover={{ scale: 1.05 }}>
            <Card className='flex flex-col h-full'>
                <img
                    src={image}
                    alt={title}
                    width={imageWidth}
                    height={imageHeight}
                    className='h-[200px] min-w-full object-cover rounded-t-xl hover:zoom-in-50'
                />
                <CardHeader className='h-full'>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className='h-full'>
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex space-x-4'>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button asChild variant='outline' size='sm'>
                                <Link to={github}>
                                    <Github className='mr-2 h-4 w-4' />
                                    GitHub
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button asChild variant='outline' size='sm'>
                                <Link to={web.url} reloadDocument>
                                    <ExternalLink className='mr-2 h-4 w-4' />
                                    {web.name}
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProjectCard;
