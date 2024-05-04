import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { BASE_URL } from './DEFAULTS';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { ClipLoader } from 'react-spinners';

interface VerifyCodeProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  newResUserId?: number | null;
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'white',
};

const VerifyCode: React.FC<VerifyCodeProps> = ({ setSuccess, newResUserId }) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [resendTime, setResendTime] = useState<number>(300); // 5 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingResendCode, setLoadingResendCode] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if(modalVisible) setSuccess(false);
  }, [modalVisible]);

  //   Redux
  const userId = useSelector((state: RootState) => state.data.userId);

  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  console.log('Verification Code: ', verificationCode);

  const handleVerificationCodeChange = (text: string, index: number) => {
    // Ensure that the code is only 4 digits
    if (/^\d{0,4}$/.test(text)) {
      const newCode = [...verificationCode];
      newCode[index] = text;
      setVerificationCode(newCode.join(''));

      if (text.length === 1 && index < 3) {
        // If a digit is entered, move focus to the next input
        const nextInput = inputRefs[index + 1].current;
        if (nextInput) {
          nextInput.focus();
        }
      } else if (text.length === 0 && index > 0) {
        // If backspace is pressed, move focus to the previous input
        const prevInput = inputRefs[index - 1].current;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (resendTime <= 0) {
      setIsTimeUp(true);
    }
  }, [resendTime]);

  const verifyCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}auth/users/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: Number(verificationCode),
          user_id: Number(newResUserId ?? userId),
        }),
      });

      if (response.ok) {
        setLoading(false);
        const responseBody = await response.json();
        if (response.status === 200 && responseBody.message) {
          setError(null);
          setMessage(responseBody.message);
          // What should happen if everything goes well...
          setModalVisible(true);

          setTimeout(() => {
            setModalVisible(false);
            // @ts-ignore
            window.location.replace('/auth/signin');
          }, 3000);
        }
      } else {
        setLoading(false);
        const responseBody = await response.json();
        if (response.status === 400 && responseBody.message) {
          console.log(responseBody);
          setMessage(null);
          setError(responseBody.message);
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      setError(`Encountered Error: ${error.message}`);
      setMessage(null);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  };

  const resendCode = async () => {
    setLoadingResendCode(true);
    try {
      const response = await fetch(
        `${BASE_URL}auth/users/verify/resend-code/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: Number(newResUserId ?? userId),
          }),
        },
      );

      if (response.ok) {
        setLoadingResendCode(false);
        const responseBody = await response.json();
        if (response.status === 200 && responseBody.message) {
          setMessage(responseBody.message);
          setError(null);
          // What should happen if everything goes well...
          setModalVisible(true);

          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        }
      } else {
        setLoadingResendCode(false);
        const responseBody = await response.json();
        if (responseBody.message) {
          setError(responseBody.message);
          setMessage(null);
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
          }, 3000);
        }
      }
    } catch (error: any) {
      setLoadingResendCode(false);
      console.log(error.message);
      setError(`Encountered Error: ${error.message}`);
      setMessage(null);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
    }
  };

  return (
    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2 h-[100vh] flex justify-center items-center relative">
      <span
        onClick={() => setSuccess(false)}
        className="absolute top-8 left-8 hover:text-orange-300 hover:cursor-pointer transition-all duration-500"
      >
        &larr; Back
      </span>
      <div className="flex flex-col items-center">
        <div className="text-center mb-12">
          <label className="text-xl font-semibold">Verify Code</label>
          <p>Please enter the verification code sent to your mail 📬</p>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}
        >
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              style={{
                width: 62,
                height: 62,
                backgroundColor: '#F0F5FA',
                textAlign: 'center',
                fontSize: 20,
                borderRadius: 10,
                color: '#333',
                marginRight: 10,
              }}
              type="text"
              maxLength={1}
              value={verificationCode[index] || ''}
              onChange={(e) =>
                handleVerificationCodeChange(e.target.value, index)
              }
            />
          ))}
        </div>
        <button
          onClick={() => {
            if (isTimeUp) {
              resendCode();
            } else {
              verifyCode();
            }
          }}
          className="mt-12 bg-primary w-1/2 py-3 text-white rounded-md hover:bg-white hover:text-primary border-[1px] transition-all duration-500 ease-in-out"
        >
          {isTimeUp ? (
            loadingResendCode ? (
              <ClipLoader
                color={'#ffffff'}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Resend Code'
            )
          ) : loading ? (
            <ClipLoader
              color={'#ffffff'}
              loading={loading}
              cssOverride={override}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            'Verify Code'
          )}
        </button>
        <div>
          <p>{`Didn't receive code? Resend in 5min ${Math.floor(resendTime / 60)}:${resendTime % 60 < 10 ? `0${resendTime % 60}` : resendTime % 60}`}</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
