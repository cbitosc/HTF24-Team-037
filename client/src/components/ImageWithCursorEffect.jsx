import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithCursorEffect = () => {
    const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;

        setTransform({
            rotateX: yPos * 20,
            rotateY: -xPos * 20,
        });
    };

    const handleMouseLeave = () => {
        setTransform({ rotateX: 0, rotateY: 0 });
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                display: 'inline-block',
                perspective: '1000px',
            }}
        >
            <motion.img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbrHxDVyoAP3C5lUVffTeA5rv3pgy449Nee9Hz2sx_sUYDCxbJQWPBGgI16TN--rosTrA&usqp=CAU"
                alt="AlumniHub"
                style={{
                    width: '750px',
                    boxShadow: '0',
                    marginRight: '90px',
                }}
                initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
                animate={{
                    rotateX: transform.rotateX,
                    rotateY: transform.rotateY,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05 }}
            />
        </motion.div>
    );
};

export default ImageWithCursorEffect;
