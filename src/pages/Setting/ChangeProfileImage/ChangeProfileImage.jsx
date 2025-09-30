/** @jsxImportSource @emotion/react */
import { useEffect, useState, useRef } from "react";
import * as s from "./styles";
import { storage } from "../../../apis/config/firebaseConfig"; // ✅ 추가
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // ✅ 추가
import { v4 as uuid } from "uuid"; // ✅ 추가
import { changeProfileImg } from "../../../apis/account/accountApis"; // ✅ 추가

function ChangeProfileImg({ oldProfileImg, userId }) {
	const [profileImg, setProfileImg] = useState(null);
	const [newProfileImg, setNewProfileImg] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const fileInputRef = useRef(null);
	const onChangeFileHandler = (e) => {
		const file = e.target.files[0];
    console.log("파일:",file)

		if (file) {
			setNewProfileImg(file);

			const reader = new FileReader();
			//파일 읽기가 완료되면 호출될 콜백 함수를 정의
			reader.onloadend = () => {
				setProfileImg(reader.result);
			};

			//선택된 파일을 URL형식으로 읽어온다
			reader.readAsDataURL(file);
		}
	};

	const onClickProfileImgHandler = () => {
		fileInputRef.current.click();
	};

	const onClickChangeBtnHandler = () => {
    console.log("업로드")
		if (!newProfileImg) {
			alert("이미지를 선택하세요.");
			return;
		}
		//업로드 시작
		setIsUploading(true);

		const imageRef = ref(
			storage,
			`profile-img/${uuid()}_${newProfileImg.name.split(".").pop()}`
		);

		const uploadTask = uploadBytesResumable(imageRef, newProfileImg);

		//업로드 상태 변화를 감지하는 이벤트 리스너를 등록
		uploadTask.on(
			"state_changed",
			//진행 상태 리스너: 업로드 진행률을 계산할 수 있게 해주는거
			(snapshot) => {
				const progressPercent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progressPercent);
			},
			//에러 핸들러
			(error) => {
				console.log(error);
				alert("업로드 중 에러가 발생했습니다.");
				setIsUploading(false);
			},
			//완료 핸들러
			async () => {
				try {
					const downloadUrl = await getDownloadURL(
						uploadTask.snapshot.ref
					);

					changeProfileImg({
						userId: userId,
						profileImg: downloadUrl,
					}).then((response) => {
						if (response.data.status === "success") {
							alert(response.data.message);
							window.location.reload();
						} else if (response.data.status === "failed") {
							alert(response.data.message);
						}
					});
				} catch (error) {
					console.log(error);
					alert("이미지 URL을 가져오는 중에 에러가 발생했습니다.");
				} finally {
					setIsUploading(false);
					setProgress(0);
				}
			}
		);
	};

	useEffect(() => {
		setProfileImg(oldProfileImg);
	}, [oldProfileImg]);

	return (
		<div css={s.container}>
			<div css={s.profileImgBox}>
				<img
					src={profileImg}
					alt="profileImage"
					onClick={onClickProfileImgHandler}
				/>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={onChangeFileHandler}
				/>
			</div>
			<div css={s.buttonBox}>
				<button onClick={onClickChangeBtnHandler}>
					{isUploading ? `${progress}%` : "변경하기"}
				</button>
			</div>
		</div>
	);
}

export default ChangeProfileImg;