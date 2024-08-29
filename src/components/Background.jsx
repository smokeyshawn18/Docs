function Background() {
  return (
    <>
      <div className="fixed z-[2] w-full h-screen">
        <div className="absolute top-[5%] w-full py-10 flex justify-center text-zinc-400 font-semibold text-2xl">
          Documents
        </div>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-zinc-950 text-[13vw] font-semibold leading-none tracking-tighter">
          Docs.
        </h1>
      </div>

      {/* Copyright Notice */}
      <div className="fixed bottom-0 w-full text-center text-xl font-bold px-5 text-white py-1  bg-zinc-900">
        &copy; 2024 smokeyshawn. All rights reserved.
      </div>
    </>
  );
}

export default Background;
