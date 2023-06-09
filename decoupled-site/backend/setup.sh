if [ -d "App_Data/blobs" ]; then 
  rm -rf App_Data/blobs
fi

if [ -d "App_Data/musicfestival.mdf" ]; then 
  rm App_Data/musicfestival.mdf
fi

if [ -d "App_Data/musicfestival_log.ldf" ]; then 
  rm App_Data/musicfestival_log.ldf
fi

echo "Removed all files from the App_Data folder"

cp -r App_Data/blobs_default App_Data/blobs

echo "Created new blobs folder"
