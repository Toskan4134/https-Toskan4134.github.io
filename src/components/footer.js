import { motion } from 'framer-motion';
const Footer = () => {
    return (
        <div className='container flex items-center justify-between gap-4 py-10 md:h-24 md:py-0 px-4'>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='flex flex-col items-center gap-4 px-8 md:gap-2 md:px-0 text-center text-sm leading-loose whitespace-pre-line'
            >
                <p>© 2024 Ángel Gaudes Martí. Todos los derechos reservados.</p>
                <p className='text-muted-foreground'>- Toskan4134 -</p>
            </motion.div>
        </div>
    );
};

export default Footer;
