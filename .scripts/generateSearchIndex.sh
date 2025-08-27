#!/bin/bash

# Check if jq (for json) is installed
if ! command -v jq &> /dev/null; then
	echo "Warning: 'jq' not installed, the output will not be validated."
fi

ROOT_DIR="${1:-.}"
FIRST_ENTRY=true

# Start the json list
echo "{"

extract_data() {
	local file="$1"

	# Load contend into one line
	local content
	content=$(tr '\n' ' ' < "$file")

	# Extract the title
	local title
	title=$(echo "$content" | sed -nE 's/.*<title[^>]*>(.*?)<\/title>.*/\1/ip' | head -n1 | sed 's/"/\\"/g')

	# Extract description
	local desc
	desc=$(echo "$content" | grep -oi '<meta[^>]*name=["'"'"']description["'"'"'][^>]*>' | \
		sed -E 's/.*content=["'"'"']([^"'"'"']*)["'"'"'].*/\1/i' | sed 's/"/\\"/g')

	# If there is no title or description, ignore this file.
	if [ -z "$title" ] || [ -z "$desc" ]; then
		return;
	fi

	# Extract keywords
	local raw_tags
	raw_tags=$(echo "$content" | grep -oi '<meta[^>]*name=["'"'"']keywords["'"'"'][^>]*>' | \
		sed -E 's/.*content=["'"'"']([^"'"'"']*)["'"'"'].*/\1/i')

	# Process tags into JSON array
	local tag_json="[]"
	if [ -n "$raw_tags" ]; then
		IFS=',' read -ra tag_array <<< "$raw_tags"
		for i in "${!tag_array[@]}"; do
			tag_array[$i]="\"$(echo "${tag_array[$i]}" | xargs | sed 's/"/\\"/g')\""
		done
		tag_json="[${tag_array[*]}]" # space-separated but each tag is quoted
		tag_json=$(echo "$tag_json" | sed 's/ /, /g')  # Add commas properly
	fi

	# Relative path as JSON key
	local key
	key="/$(realpath --relative-to="$ROOT_DIR" "$file" | sed 's/"/\\"/g')"

	if [[ "$key" == */index.html ]]; then
		key="${key%index.html}"
	elif [[ "$key" == */index.htm ]]; then
		key="${key%index.htm}"
	fi

	if [ "$FIRST_ENTRY" = false ]; then
		echo ","
	fi
	FIRST_ENTRY=false

	echo " \"$key\": {"
	echo "  \"title\": \"${title:-}\" ,"
	echo "  \"tags\": ${tag_json},"
	echo "  \"desc\": \"${desc:-}\""
	echo -n " }"
}

# Recursively find HTML files and process
while IFS= read -r -d '' file; do
	extract_data "$file"
done < <(find "$ROOT_DIR" -type f \( -iname "*.html" -o -iname "*.htm" \) -print0)

echo
echo "}"
