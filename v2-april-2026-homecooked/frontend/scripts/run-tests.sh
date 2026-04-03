#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "🧪 Running tests..."
echo ""

cd "$SCRIPT_DIR" && bun vitest run
