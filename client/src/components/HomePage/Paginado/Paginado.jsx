import PropTypes from 'prop-types';
import styles from './Paginado.module.css';
import leftImg from '../../img/circle-left-regular.svg';
import rightImg from '../../img/circle-right-regular.svg';
import { useSelector } from 'react-redux';

function Paginado({ totalPages, onPageChange }) {
    const page = useSelector(state => state.page);

    function handleNextPage() {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    }

    function handlePrevPage() {
        if (page > 1) {
            onPageChange(page - 1);
        }
    }

    return (
        <div className={styles['mainView']}>
            <img onClick={handlePrevPage} id={styles.arrows} className={styles['leftArrow']} src={leftImg} alt="" />
            <div className={styles['pagesBox']}>
                <div className={styles['pagesSubBox']}>
                    <input value={page} type="text" readOnly max={totalPages} min='0' />
                    <p>de {totalPages}</p>
                </div>
            </div>
            <img onClick={handleNextPage} id={styles.arrows} className={styles['rightArrow']}src={rightImg} alt="" />
        </div>
    );
}

Paginado.propTypes = {
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Paginado;
