import classNames from 'classnames';
import styles from './styles.module.scss';

interface InfoLoneProps{
    title: string;
    info: string | React.ReactNode;
    sidebarVariant?: boolean;
}

const InfoLine = ({title, info, sidebarVariant}: InfoLoneProps) => {
  return (
    <>
      <span className={classNames(styles.title, sidebarVariant && styles.sidebarVariant)}>{title}</span>
      <span className={styles.info}>
        {info}
      </span>
    </>
  );
};

export default InfoLine;
