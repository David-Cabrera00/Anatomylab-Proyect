$content = Get-Content src\App.tsx
$clean = $content[0..1398]  # 0-indexed, so 1399 lines = 0-1398
$clean += "export default App;"
$clean | Out-File -Encoding utf8 src\App.tsx