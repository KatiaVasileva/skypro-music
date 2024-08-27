import { IconProps } from "@/types/IconProps.types";

function Icon({ wrapperClass = "", iconClass, name, onClick }: IconProps) {
  return (
    <div className={wrapperClass} onClick={onClick}>
      <svg className={iconClass}> 
        <use xlinkHref={`/img/icon/sprite.svg#${name}`}></use>
      </svg>
    </div>
  );
}

export default Icon;
