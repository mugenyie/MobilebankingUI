export default function AuthLayout({children}) {
    return (
      <div className="min-h-full h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-8">
          {children}
          </div>
      </div>
    )
  }
  