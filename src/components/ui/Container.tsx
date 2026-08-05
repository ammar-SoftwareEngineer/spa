/**
 * Container — عرض موحّد لكل أقسام الصفحة
 * استخدمه بدل تكرار container / max-w / padding في كل سكشن
 */
type ContainerProps = React.ComponentPropsWithoutRef<"div">;

export default function Container({
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`container mx-auto w-full px-4 md:px-10 lg:px-20 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
