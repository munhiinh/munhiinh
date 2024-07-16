import css from "../../styles/Home.module.css";
const PreLoader = () => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.truckWrapper}>
        <div className={css.truck}>
          <div className={css.truckContainer}></div>
          <div className={css.glases}></div>
          <div className={css.bonet}></div>

          <div className={css.base}></div>

          <div className={css.baseAux}></div>
          <div className={css.wheelBack}></div>
          <div className={css.wheelFront}></div>

          <div className={css.smoke}></div>
        </div>
      </div>
    </div>
  );
};
export default PreLoader;
