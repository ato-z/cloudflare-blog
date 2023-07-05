import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './index.scss';

export const NotFoundPage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <article className="not-found-page">
      <div className="code-area">
        <span style={{ color: '#777', fontStyle: 'italic' }}>
          // 404 page not found.
        </span>
        <p>
          <span style={{ color: '#d65562' }}>if</span> {' ('}
          <span style={{ color: '#4ca8ef' }}>!</span>
          <span style={{ fontStyle: 'italic', color: '#bdbdbd' }}>found</span>
          {') {'}
        </p>
        <p>
          <span style={{ paddingLeft: '2em', color: '#2796ec' }}>throw</span>(
          <span style={{ color: '#a6a61f' }}>{'"(╯°□°)╯︵ ┻━┻"'}</span>)
        </p>
        <p>{'}'}</p>
        <p style={{ color: '#777', fontStyle: 'italic' }}>
          //{' '}
          <Link to={'/'} className="link">
            Go home!
          </Link>
        </p>
      </div>
    </article>
  </motion.div>
);

export default NotFoundPage;
