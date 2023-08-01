#!/bin/bash
# This script creates all the resized images for the gallery.
# it should be run in public/gallery
# it uses sips (macos) and imagemagick (brew install imagemagick)
# if you don't have sips, you can use imagemagick for all the resizing
cnt=`find . -name "*.jpg" -not -name "*-100.jpg" -not -name "*-512.jpg" -not -name "*-1024.jpg" -not -name "*-1800.jpg" -not -name "*-3600.jpg" | wc -l`
echo "Found $cnt candidate files to resize"
find . -name "*.jpg" -not -name "*-100.jpg" -not -name "*-512.jpg" -not -name "*-1024.jpg" -not -name "*-1800.jpg" -not -name "*-3600.jpg" | cat -n | while read n f; do
  b=${f%.*}
  if [[ -e $b.done ]]; then
    continue
  fi
  echo $b
  # use sips if available, it is just faster
  if [[ -e /usr/bin/sips ]]; then
    sips -Z 100 $f -o $b-100.jpg
    sips -Z 512 $f -o $b-512.jpg
    sips -Z 1024 $f -o $b-1024.jpg
    sips -Z 1800 $f -o $b-1800.jpg
    sips -Z 3600 $f -o $b-3600.jpg
  else
   magick $f -resize 100x100 $b-100.jpg
   magick $f -resize 512x512 $b-512.jpg
   magick $f -resize 1024x1024 $b-1024.jpg
   magick $f -resize 1800x1800 $b-1800.jpg
   magick $f -resize 3600x3600 $b-3600.jpg
  fi

  # use imagemagick for to change the image quality to 75 and interlace it for progressive display where supported
  parallel -X mogrify -interlace plane -quality 75 ::: $b-*.jpg

  # Mark this file as done
  touch $b.done

  # Add the files to git
  git add $b-*.jpg
done
echo "Done - $cnt files checked"

