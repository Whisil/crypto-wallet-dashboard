import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import icons from "src/constants/icons";
import { getWallet, signInMetamask } from "src/redux/actions/auth";
import { AppDispatch } from "src/redux/store";

import styles from "./index.module.scss";

interface HeaderProps {
  handleShowSidebar(): void;
}

const Header = ({ handleShowSidebar }: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [wallet, setWallet] = useState<string>("");

  useEffect(() => {
    dispatch(signInMetamask());
  }, [dispatch]);

  useEffect(() => {
    const getWalletAddress = async () => {
      const walletAddress = await getWallet();
      setWallet(walletAddress);
    };
    getWalletAddress();
  }, [wallet]);

  return (
    <header className={styles.header}>
      <div className={styles.logoHalf}>
        <div className={styles.menuBtn} onClick={handleShowSidebar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.25194 6.99902C4.25194 6.58481 4.58772 6.24902 5.00194 6.24902H18.998C19.4122 6.24902 19.748 6.58481 19.748 6.99902C19.748 7.41324 19.4122 7.74902 18.998 7.74902H5.00194C4.58772 7.74902 4.25194 7.41324 4.25194 6.99902ZM4.25194 11.9995C4.25194 11.5853 4.58772 11.2495 5.00194 11.2495H18.998C19.4122 11.2495 19.748 11.5853 19.748 11.9995C19.748 12.4137 19.4122 12.7495 18.998 12.7495H5.00194C4.58772 12.7495 4.25194 12.4137 4.25194 11.9995ZM5.00194 16.2505C4.58772 16.2505 4.25194 16.5863 4.25194 17.0005C4.25194 17.4147 4.58772 17.7505 5.00194 17.7505H18.998C19.4122 17.7505 19.748 17.4147 19.748 17.0005C19.748 16.5863 19.4122 16.2505 18.998 16.2505H5.00194Z"
              fill="#838487"
            />
          </svg>
        </div>

        <img src={icons.logo} alt="Logo" />
      </div>
      <h4 className={styles.headerTitle}>Wallet</h4>
      {wallet && (
        <div className={styles.headerWallet}>
          <span className={styles.headerWalletText}>
            <span>Connected: </span>
            {`${wallet.substring(0, 6)}...${wallet.slice(-4)}`}
          </span>
          <img src={icons.UserAvatar} alt="User Avatar" />
        </div>
      )}
    </header>
  );
};

export default Header;
