import time
from deepface import DeepFace
import cv2
import sys
import threading
from utilities import init_robot, run_seq

cap = cv2.VideoCapture(0)
lock = threading.Lock()
is_running = False
emotion_thread = None

def runEmotion(emotion: str):
    print(f"Running emotion: {emotion}")
    global is_running
    with lock:
        is_running = True
    match emotion:
        case "happy":
            run_seq("happy")
        case "sad":
            run_seq("sad")
        case "angry":
            run_seq("anger_explode")
        case "fear":
            run_seq("fear_look")
        case _:
            run_seq("reset")
    time.sleep(10)
    with lock:
        is_running = False

def main():
    init_robot()
    global is_running, emotion_thread

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Analyze emotions
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)

        # Print result
        print("Emotion:", result[0]['dominant_emotion'])
        emotion = result[0]['dominant_emotion']

        with lock:
            currently_running = is_running

        if not currently_running:
            print("Starting new emotion thread")
            if emotion_thread is not None and not emotion_thread.is_alive():
                emotion_thread.join()

            emotion_thread = threading.Thread(target=runEmotion, args=(emotion,))
            emotion_thread.start()

        cv2.imshow("Emotion Detection", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    if emotion_thread is not None and emotion_thread.is_alive():
        emotion_thread.join()
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
