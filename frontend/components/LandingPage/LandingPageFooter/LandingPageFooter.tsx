import styles from "./LandingPageFooter.module.css";
import whiteLogo from "../../../../public/Images/centwisePhoto_W.png"
const LandingPageFooter = () => {
    return (
        <footer className={styles.main_footer}>
        <div className={styles.footer}>
          <section className={styles.logo_social_media}>
            <div>
              <div><img className={styles.footer_logo} src={whiteLogo} width="150px" height="30px" /></div>
              <div className={styles.socialIcons}>
                {/* <a href="#"><img className={styles.social} src="assets/assets/images/facebook_app_symbol.png" alt="fb"/></a>
                <a href="#"><img className={styles.social} src="assets/assets/images/twitter.png" alt="fb"/></a>
                <a href="#"><img className={styles.social} src="assets/assets/images/youtube.png" alt="fb"/></a>
                <a href="#"><img className={styles.social} src="assets/assets/images/instagram.png" alt="fb"/></a> */}
              </div>
            </div>
          </section>
          <section className={styles.logo_social_media}>
            <li className={styles.footer_list}>
              <ul><h3>Team</h3></ul>
              <ul>Yashvardhan Limbodiya</ul>
              <ul>Manan Vijayvargiya</ul>
              <ul>Ashay Saoji</ul>
              <ul>Kshiti Dangore</ul>
            </li>
          </section>
          <section className={styles.logo_social_media}>
            <li className={styles.footer_list}>
              <ul><h3>About Project</h3></ul>
              <ul>Description</ul>
              <ul>Features</ul>
              <ul>Technology Used</ul>
              <ul>UI Mockup</ul>
            </li>
          </section>
          <section className={styles.logo_social_media}>
            <li className={styles.footer_list}>
              <ul><h3>Contact Us</h3></ul>
              <ul>Our Story</ul>
              <ul>Work with Us</ul>
            </li>
          </section>
        </div>
        <hr className={styles.hr}/>
        <p className={styles.p}>Design and develop by Team Centwise</p>
      </footer>
    );
}

export default LandingPageFooter;