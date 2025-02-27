import Header from '@/shared/layouts/header';
import Footer from '@/shared/layouts/footer/Footer';
import Floating from './floating/Floating';

interface Props {
  header?: boolean;
  footer?: boolean;
  floating?: boolean;
  children: React.ReactNode;
}

const AppLayout = ({
  children,
  header = false,
  footer = false,
  floating = false,
}: Props) => {
  return (
    <>
      {header && <Header />}
      {children}
      {footer && <Footer />}
      {floating && <Floating />}
    </>
  );
};

export default AppLayout;
