import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { IKContext, IKImage, IKUpload } from "imagekitio-react";

import { selectedImageState } from './recoil/selectedImage';
import { Box, Heading } from './styledComps/Images'
import { callApi } from './utils/callApi';
import { ImageWrapper } from './styledComps/Image';

import { Flex } from "./styledComps/UploadButton"

const Images = (props) => {
    const { isOpen } = props;

    const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
    const [images, setImages] = useState([]);

    useEffect(() => {
        isOpen &&
            callApi({
                url: "/api/list-images",
                method: "GET"
            }).then(res => {
                setImages(res?.images)
            }).catch(err => {
                console.error(err)
            })
    }, [isOpen])

    return (
        <Box>
            <Heading>
                Your Image(s)
            </Heading>
            <IKContext
                publicKey="public_ElpJYTdJgF4FWxgpCF1P4zNIfKI="
                urlEndpoint="https://ik.imagekit.io/s3zl5hug1"
                transformationPosition="path"
                authenticationEndpoint="http://localhost:8080/api/auth-upload"
            >
                <Flex 
                    height={"200px"}>
                    {
                        images.map((image, idx) =>
                            <ImageWrapper 
                                key = {idx} 
                                isSelected = {selectedImage === image?.url} 
                                onClick={() => setSelectedImage(image?.url)}
                            >
                                <IKImage
                                    path={image?.filePath}
                                    transformation={[{
                                        "height": "100",
                                        "width": "100"
                                    }]}
                                />
                            </ImageWrapper>
                        )
                    }
                </Flex>
            </IKContext>
        </Box>
    )
}

export default Images