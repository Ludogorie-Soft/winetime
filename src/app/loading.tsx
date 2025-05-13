import Image from 'next/image'

const Loader = () => {
  return (
    <div
      style={{ zIndex: 10000 }}
      className="fixed inset-0 grid place-content-center bg-black bg-opacity-50 backdrop-blur-sm px-4 py-24"
    >
      <div className="flex flex-col items-center justify-center ">
        <Image src="/assets/icons/three-dots.svg" alt="logo" width={90} height={90} />
        <p className="text-center text-gray-300 text-2xl opacity-70">WineTime</p>
      </div>
    </div>
  )
}

export default Loader
