# backend/app/utils/redis_manager.py
import aioredis
import os

class RedisManager:
    _redis = None

    @classmethod
    async def get_redis(cls):
        if cls._redis is None:
            cls._redis = await aioredis.create_redis_pool(
                os.getenv("REDIS_URL", "redis://localhost:6379")
            )
        return cls._redis

    @classmethod
    async def publish_message(cls, channel, message):
        redis = await cls.get_redis()
        await redis.publish(channel, message)

    @classmethod
    async def close(cls):
        if cls._redis:
            cls._redis.close()
            await cls._redis.wait_closed()
