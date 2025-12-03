# Build the images
Write-Host "Building Docker images..."
docker-compose build

# Push the images to Docker Hub
Write-Host "Pushing Backend image..."
docker push petros1234/campussync-backend:latest

Write-Host "Pushing Frontend image..."
docker push petros1234/campussync-frontend:latest

Write-Host "Done! Images pushed to Docker Hub."
