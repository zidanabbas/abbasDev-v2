function DashedDivider({ className }) {
  return (
    <>
      <div
        className={`border-b border-dashed border-neutral-600 dark:border-neutral-500 my-6 ${className}`}
      ></div>
    </>
  );
}

export default DashedDivider;
