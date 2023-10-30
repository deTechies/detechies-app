
export default function Loading() {
  return (
    <div>
      {
        Array(12)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index} className="animate-pulse bg-neutral-100 dark:bg-neutral-900" />
            );
          })
      }
      
    </div>
  )
}
