import React, { useCallback, useContext, useMemo, useState } from 'react';
import ImageView from 'react-native-image-viewing';

const useImageViewer = () => {
  return useContext(ImageViewerContext);
};

export default useImageViewer;

type imageShowT = {
  isShow?: boolean;
  uri?: string;
};

export type ImageViewerT = {
  imageShow?: imageShowT;
  setState: (imageViewing: imageShowT) => void;
};

export const ImageViewerContext = React.createContext<Partial<ImageViewerT>>(
  {},
);

export const ImageViewerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [imageShow, setImageShow] = useState<imageShowT>({
    isShow: false,
  });

  const setState = useCallback((imageViewing: imageShowT) => {
    setImageShow(pre => ({ ...pre, ...imageViewing }));
  }, []);

  const contextValue = useMemo<ImageViewerT>(
    () => ({
      imageShow,
      setState,
    }),
    [imageShow, setState],
  );
  return (
    <ImageViewerContext.Provider value={contextValue}>
      {children}
      <ImageView
        images={[{ uri: imageShow?.uri ?? '' }]}
        imageIndex={0}
        visible={Boolean(imageShow?.uri && imageShow?.isShow)}
        onRequestClose={() => setState({ isShow: false })}
      />
    </ImageViewerContext.Provider>
  );
};
