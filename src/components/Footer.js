
// в даном компоненте мы не принимаем props аргумент
function Footer(){

  // возвращаем jsx разметку компонента
  return (
    <footer className="footer">
      <p className="footer__copyraite">&#169; 2023 Mesto Russio</p>
    </footer>
  );
}

// экспортируем компонент в основной код
export default Footer;