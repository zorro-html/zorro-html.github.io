declare -a arr=("core-collapse" "core-selector" "core-selection" "docs-maker" "web-component-tester" "polymer" "webcomponentsjs" "docs-parser" "marked")

for i in "${arr[@]}"
do
   rm -Rf $i
   mkdir $i
   cp -R ../$i/* $i
done
