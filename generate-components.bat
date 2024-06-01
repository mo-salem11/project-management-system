@echo off
set components=

for %%n in (%components%) do (
  npx generate-react-cli component %%n
)
