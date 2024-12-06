function Error() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-[5px] items-center">
        <img src="/gifs/dancingCat.gif" alt="Error" />
        <p className="text-[#ED6656] text-[1.4rem]">
          Sorry there was an error!
        </p>
      </div>
    </div>
  );
}

export default Error;
