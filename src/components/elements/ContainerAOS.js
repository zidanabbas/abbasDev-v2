export default function ContainerAOS({ children, className }) {
  return (
    <div className={`mb-12 ${className}`} data-aos="fade-up">
      {children}
    </div>
  );
}
