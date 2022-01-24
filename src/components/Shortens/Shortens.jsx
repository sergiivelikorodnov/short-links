import {Button} from 'components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Shortens.module.scss';
import { selectLinks } from 'store/slice/linkSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Shortens = () => {
    const links = useSelector(selectLinks);
    const [copiedLink, setCopiedLink] = useState(null);

    const copyOnClipboard = (link) =>{
      navigator.clipboard.writeText(link).then(
        setCopiedLink(link)
      )
    }

    if (!links?.length) return null;

    return (
        <section className={classes.Shortens}>
            <div className='container'>
                {links.map(item => (
                    <AnimatePresence key={item.code}>
                        <motion.div
                            className={classes.item}
                            data-active={copiedLink===item.full_short_link2}
                            initial = {{opacity: 0, height:0 }}
                            animate = {{opacity:1, height: 'auto'}}
                        >
                            <span>{item.original_link}</span>
                            <span>{item.full_short_link2}</span>
                            <Button
                                variant="square"
                                onClick ={()=>copyOnClipboard(item.full_short_link2)}
                            >
                                {copiedLink===item.full_short_link2 ? 'Copied!' : 'Copy'}
                            </Button>
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>
        </section>
    );
};

export {Shortens};
