type IconProps = {
  wrapperClass?: string;
  iconClass?: string;
  name: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

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
