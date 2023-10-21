from algoliasearch.search_client import SearchClient
import json

# Create the Algolia Search Client and initalise the index
client = SearchClient.create('RED32ZA6S9', 'b615b62006c087c85fbc683223a3012a')
index = client.init_index('restaurants')

# Define file name containing the data to be pushed to the index
fileName = 'merged_data.json'

# Open the file
data = json.load(open(fileName))

# Push the data to the Algolia index
result = index.save_objects(data, {'autoGenerateObjectIDIfNotExist': True})

# Print the result to the terminal
print(result)