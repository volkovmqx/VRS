cvlc -vvv v4l2:///dev/video1 --sout '#transcode{vcodec=MJPG,width=640,vb=1500,venc=ffmpeg{strict=1}}:standard{access=http{mime=multipart/x-mixed-replace;boundary=--7b3cc56e5f51db803f790dad720ed50a},mux=mpjpeg,dst=:8080}' &

cvlc -vvv v4l2:///dev/video2 --sout '#transcode{vcodec=MJPG,width=640,vb=1500,venc=ffmpeg{strict=1}}:standard{access=http{mime=multipart/x-mixed-replace;boundary=--7b3cc56e5f51db803f790dad720ed50a},mux=mpjpeg,dst=:8081}' &
