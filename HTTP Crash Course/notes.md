# HTTP (HyperText Transfer Protocol)

## Definition:
HTTP is an application layer protocol that facilitates communication between clients (typically web browsers) and servers. It is a stateless protocol, meaning that each request from a client to a server is independent and unrelated to previous requests.

## Key Concepts:

1. **Client-Server Model:**
   - **Client:** Initiates requests for resources or services.
   - **Server:** Listens for incoming requests, processes them, and sends back the appropriate responses.

2. **Stateless Protocol:**
   - Each request from a client to a server is independent, and the server does not retain any information about the client's previous requests.

3. **HTTP Methods:**
   - - **GET:** Retrieve data from a specified resource.
   - - **POST:** Submit data to be processed to a specified resource.
   - - **PUT:** Update a resource or create a new resource if it doesn't exist.
   - - **DELETE:** Delete a specified resource.
   - - And others (e.g., HEAD, OPTIONS, PATCH).

4. **HTTP Status Codes:**
   - - **1xx:** Informational responses.
   - - **2xx:** Success. The request was successfully received, understood, and accepted.
   - - **3xx:** Redirection. Further action needs to be taken to fulfill the request.
   - - **4xx:** Client errors. The request contains bad syntax or cannot be fulfilled.
   - - **5xx:** Server errors. The server failed to fulfill a valid request.

5. **Headers:**
   - HTTP headers provide additional information about the request or response. Examples include "Content-Type," "Authorization," and "User-Agent."

6. **URL (Uniform Resource Locator):**
   - A URL is used to identify resources on the web. It includes the protocol (e.g., "http" or "https"), the domain, and the path to the resource.

7. **State Management:**
   - HTTP itself is stateless, but cookies and sessions are commonly used for state management. Cookies are small pieces of data stored on the client, and sessions are maintained on the server.

8. **Security:**
   - HTTPS (HTTP Secure) is an extension of HTTP that adds a layer of security through encryption. It uses SSL/TLS protocols to secure the communication between the client and the server.

## Example Request-Response Cycle:
1. The client sends an HTTP request to a specific URL using a certain HTTP method.
2. The server processes the request and sends back an HTTP response, which may include the requested data or indicate the success or failure of the request.
3. The client processes the response and may perform further actions based on the information received.

HTTP is a fundamental protocol for web communication and is used extensively for various types of interactions between clients and servers on the internet.

</hr>

# HTTP HEADERS:
HTTP headers are essential components of the HTTP protocol used for communication between a client (e.g., a web browser) and a server. They provide additional information about the request or the response being sent, helping both parties understand and process the communication effectively. Here's an elaboration on some key aspects of HTTP headers:


## Structure of HTTP Headers:

- **Header Fields:** Each HTTP header consists of a field name and a field value, separated by a colon. For example:

```bash
Content-Type: application/json
```


- **Request Headers:** Sent by the client to provide additional information about the request. Examples include `User-Agent`, `Authorization`, and `Content-Type`.

- **Response Headers:** Sent by the server to convey information about the response. Examples include `Content-Type`, `Server`, and `Set-Cookie`.

- **Common Header Fields:**
- **Date:** Indicates the date and time at which the message was sent.
- **Content-Type:** Specifies the media type of the resource or data being sent.
- **Content-Length:** Indicates the size of the entity-body in bytes.
- **Cache-Control:** Specifies caching directives for both requests and responses.
- **Authorization:** Contains credentials for authenticating the client with the server.
- **User-Agent:** Identifies the user agent (e.g., browser) initiating the request.
- **Accept:** In a request, it specifies the media types that are acceptable for the response.
- **Location:** In a response, it provides the URL to redirect the client to.

## Types of Headers:

- **General Headers:** Headers that can be present in both request and response messages but have no specific relation to the data in the body of the message. Examples include `Cache-Control` and `Connection`.

- **Request Headers:**
- **Host:** Specifies the domain name of the server.
- **Accept-Encoding:** Informs the server about the client's supported encoding methods.

- **Response Headers:**
- **Server:** Identifies information about the software used by the origin server.
- **Last-Modified:** Indicates the date and time at which the resource was last modified.

- **Entity Headers:** Headers that provide information about the resource representation in the body of the message. Examples include `Content-Type` and `Content-Length`.

## Practical Use Cases:

- **Content Negotiation:** The `Accept` header in a request allows the client to specify the media types it can process, and the server can respond with the appropriate content type.

- **Authentication:** The `Authorization` header is used to send credentials (e.g., tokens) to authenticate the client.

- **Caching:** The `Cache-Control` header provides directives to control caching behavior, helping optimize performance by avoiding unnecessary data transfers.

- **Redirects:** The `Location` header in a response is used to instruct the client to redirect to a different URL.

</hr>

# HTTP Methods
HTTP methods, also known as HTTP verbs, indicate the desired action to be performed on a resource identified by a URL. Each HTTP request typically uses one of these methods.

## Common HTTP Methods:

1. **GET:**
   - **Purpose:** Retrieve data from a specified resource.
   - **Safe:** Yes (Should not have the effect of modifying the server state).
   - **Idempotent:** Yes (Repeated requests have the same effect as a single request).

2. **POST:**
   - **Purpose:** Submit data to be processed to a specified resource.
   - **Safe:** No.
   - **Idempotent:** No (Repeated requests may have different effects).

3. **PUT:**
   - **Purpose:** Update a resource or create a new resource if it doesn't exist.
   - **Safe:** No.
   - **Idempotent:** Yes (Repeated requests have the same effect as a single request).

4. **DELETE:**
   - **Purpose:** Delete a specified resource.
   - **Safe:** No.
   - **Idempotent:** Yes (Repeated requests have the same effect as a single request).

5. **PATCH:**
   - **Purpose:** Apply partial modifications to a resource.
   - **Safe:** No.
   - **Idempotent:** No (Repeated requests may have different effects).

6. **HEAD:**
   - **Purpose:** Retrieve the headers for a specified resource without the body.
   - **Safe:** Yes.
   - **Idempotent:** Yes.

7. **OPTIONS:**
   - **Purpose:** Get information about the communication options available for a resource.
   - **Safe:** Yes.
   - **Idempotent:** Yes.

8. **TRACE:**
   - **Purpose:** Echoes the received request, so that a client can see what (if any) changes or additions have been made by intermediate servers.
   - **Safe:** Yes.
   - **Idempotent:** Yes.

9. **CONNECT:**
   - **Purpose:** Establish a tunnel to the server identified by a given URL.
   - **Safe:** No.
   - **Idempotent:** No.

## Additional Considerations:

- **Safe Methods:** Methods that are intended only for information retrieval and should not have side effects on the server.

- **Idempotent Methods:** Methods that can be repeated many times with the same outcome. Subsequent identical requests should have the same effect as the first request.

- **Non-Idempotent Methods:** Methods that may have different outcomes with repeated identical requests.

- **Safe and Idempotent Methods:** GET, HEAD, OPTIONS, and TRACE are considered both safe and idempotent.

- **Statelessness:** HTTP is a stateless protocol, meaning each request from a client to a server is independent, and the server does not retain any information about the client's previous requests.

</hr>

# HTTP Status Codes

HTTP status codes are three-digit numbers returned by a server to indicate the status of a client's request made to the server. These codes are grouped into different classes, each serving a specific purpose. Here's an overview of commonly used HTTP status codes:

## HTTP Status Code Classes:

1. **1xx Informational:**
   - **100 Continue:** The server has received the request headers and the client should proceed with the request.
   - **101 Switching Protocols:** The server is switching protocols according to the client's request.

2. **2xx Success:**
   - **200 OK:** The request was successful.
   - **201 Created:** The request was successful, and a new resource was created.
   - **204 No Content:** The server successfully processed the request but there is no content to send.

3. **3xx Redirection:**
   - **301 Moved Permanently:** The requested resource has been permanently moved to a new location.
   - **302 Found (or 303 See Other):** The requested resource has been temporarily moved to another location.
   - **304 Not Modified:** The client's cached copy is up-to-date, and the requested resource has not been modified.

4. **4xx Client Errors:**
   - **400 Bad Request:** The server cannot understand the request.
   - **401 Unauthorized:** The request requires user authentication.
   - **403 Forbidden:** The server understood the request, but it refuses to authorize it.
   - **404 Not Found:** The requested resource could not be found.

5. **5xx Server Errors:**
   - **500 Internal Server Error:** A generic error message indicating an internal server error.
   - **501 Not Implemented:** The server does not support the functionality required to fulfill the request.
   - **502 Bad Gateway:** The server, while acting as a gateway or proxy, received an invalid response from an inbound server.
   - **503 Service Unavailable:** The server is not ready to handle the request.

## Additional Status Codes:

- **429 Too Many Requests:** The user has sent too many requests in a given amount of time.

- **451 Unavailable For Legal Reasons:** The server is denying access to the resource as a consequence of a legal demand.

## Usage Tips:

- **2xx Codes:** Indicate success. The request was successfully received, understood, and accepted.

- **3xx Codes:** Indicate redirection. The client usually needs to take additional action to complete the request.

- **4xx Codes:** Indicate client errors. The client seems to have made an error or needs to authenticate itself to get the requested response.

- **5xx Codes:** Indicate server errors. The server failed to fulfill a valid request.






