'use client'

type TImage = {
  path: string;
  alt: string;
};

const ImgClient = (props: TImage) => {
  const {path, alt} = props;

  return (
    <img alt={alt} src={path} />
  )
}

export default ImgClient