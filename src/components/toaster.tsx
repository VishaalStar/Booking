import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`rounded-md p-4 shadow-md ${
            toast.variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="mt-1 text-sm">{toast.description}</p>}
        </div>
      ))}
    </div>
  )
}

